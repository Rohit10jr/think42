import random
from django.conf import settings
from django.core.mail import send_mail
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

def generate_otp():
    return str(random.randint(100000, 999999))

def send_otp_via_email(email, otp):

    try:
        validate_email(email)
    except ValidationError:
        print("Invalid email format")
        return False
    
    subject = "Your OTP for Login/Registration"
    message = f"Your One-Time Password (OTP) is: {otp}\nThis OTP is valid for 5 minutes."
    # from_email = settings.DEFAULT_FROM_EMAIL  
    from_email = None
    
    try:
        send_mail(subject, message, from_email, [email])
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False