from django.core.mail import send_mail

def send_verification_email(user, token):
    subject = 'Owlie: your verification code'
    message = f'Hello {user.username}, Your verification code is: {token}'
    from_email = None
    recipient_list = [user.email]

    send_mail(subject, message, from_email, recipient_list)