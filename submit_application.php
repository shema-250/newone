<?php
$surname = $_POST['surname'];
$middle_name = $_POST['middle_name'];
$first_name = $_POST['first_name'];
$preferred_name = $_POST['preferred_name'];
$dob = $_POST['dob'];
$gender = $_POST['gender'];
$nationality = $_POST['nationality'];
$applying_for = $_POST['applying_for'];

$parent_title = $_POST['parent_title'];
$parent_gender = $_POST['parent_gender'];
$parent_first_name = $_POST['parent_first_name'];
$parent_last_name = $_POST['parent_last_name'];
$parent_nationality = $_POST['parent_nationality'];
$relationship = $_POST['relationship'];
$email = $_POST['email'];
$phone_number = $_POST['phone_number'];
$whatsapp_number = $_POST['whatsapp_number'];
$state = $_POST['state'];
$city = $_POST['city'];
$referral = $_POST['referral'];

$conn =new mysqli('localhost', 'root', '', 'school_application');
if ($conn->connect_error) {
    die("Connection failed:" . $conn->connect_error);
}else{
    $stmt = $conn->prepare("INSERT INTO applications (surname, middle_name, first_name, preferred_name, 
    dob,gender,nationality,applying_for,parent_title,parent_gender,parent_first_name,parent_last_name,
    parent_nationality,relationship,email,phone_number,whatsapp_number,state,city,referral)
    values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
    $stmt->bind_param("sssssssssssssssssssss", $surname, $middle_name, $first_name, $preferred_name,
    $dob, $gender, $nationality, $applying_for, $parent_title
    , $parent_gender, $parent_first_name, $parent_last_name,
    $parent_nationality, $relationship, $email, $phone_number, $whatsapp_number,
    $state, $city, $referral);
    if($stmt->execute()){
        echo "Application submitted successfully";
      $stmt->close();
      $conn->close();  
      var_dump($_SERVER['REQUEST_METHOD']);
      if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Redirect to the thank you page
        header('Location: thank_you.php');
        exit(); 
?>