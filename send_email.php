<?php
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "ok" => false,
        "error" => "Invalid request method"
    ]);
    exit;
}

// استقبال البيانات من الفورم
$name    = trim($_POST['name'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$vehicle = trim($_POST['vehicle'] ?? '');
$budget  = trim($_POST['budget'] ?? '');
$message = trim($_POST['message'] ?? '');

// تحقق بسيط
if ($name === '' || $phone === '') {
    echo json_encode([
        "ok" => false,
        "error" => "الاسم ورقم الهاتف مطلوبين"
    ]);
    exit;
}

// إعدادات البريد
$to      = "info@rwadcars.ly";          // يستقبل الطلبات
$from    = "rwadcars@rwadcars.ly";      // مرسل من نفس الدومين
$subject = "طلب جديد من الموقع - الرواد المتألق";

// Headers
$headers  = "From: الرواد المتألق <$from>\r\n";
$headers .= "Reply-To: $to\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// محتوى الرسالة
$body =
    "طلب جديد من الموقع\n\n" .
    "الاسم: $name\n" .
    "رقم الهاتف: $phone\n" .
    "نوع المركبة: " . ($vehicle !== '' ? $vehicle : "غير محدد") . "\n" .
    "الميزانية: " . ($budget !== '' ? $budget : "غير محددة") . "\n\n" .
    "تفاصيل إضافية:\n$message\n";

// إرسال البريد
$sent = mail($to, $subject, $body, $headers);

// رد JSON للـ JavaScript
echo json_encode([
    "ok"    => $sent,
    "error" => $sent ? null : "فشل إرسال البريد، يرجى المحاولة لاحقًا"
]);
