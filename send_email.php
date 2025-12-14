<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // استقبال البيانات من الفورم (مطابقة لأسماء الحقول name="")
    $name    = trim($_POST['name'] ?? '');
    $phone   = trim($_POST['phone'] ?? '');
    $vehicle = trim($_POST['vehicle'] ?? '');
    $budget  = trim($_POST['budget'] ?? '');
    $message = trim($_POST['message'] ?? '');

    // تحقق بسيط
    if ($name === '' || $phone === '') {
        http_response_code(400);
        echo "الاسم ورقم الهاتف مطلوبين.";
        exit;
    }

    $to      = "info@rwadcars.ly";
    $subject = "طلب جديد من الموقع - الرواد المتألق";

    // (اختياري) من الأفضل يكون من نفس الدومين في الاستضافة
    $from = "info@rwadcars.ly";

    $headers  = "From: $from\r\n";
    $headers .= "Reply-To: $from\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $body =
        "طلب جديد من الموقع\n\n" .
        "الاسم: $name\n" .
        "الهاتف: $phone\n" .
        "نوع المركبة: $vehicle\n" .
        "الميزانية: $budget\n\n" .
        "تفاصيل إضافية:\n$message\n";

    // إرسال الإيميل
    $sent = mail($to, $subject, $body, $headers);

    if ($sent) {
        // رجّع المستخدم لصفحة شكراً (اختياري)
        // header("Location: thankyou.html"); exit;

        echo "تم إرسال طلبك بنجاح.";
    } else {
        http_response_code(500);
        echo "حدث خطأ أثناء الإرسال. حاول مرة أخرى.";
    }
}
?>
