# forgot password

**RF**
functioning rules

- User should be able to recover password by informing email;
- User should receive an email with instructions to recover password;
- User should be able to recover password;

**RNF**
non-functioning rules

- Use Mailtrap to test in development environment
- Use Amazon SES to send email in production
- Email should be a background job (redis)

**RN**
business rules

- Emailed link should expire in 2h;
- User needs to confirm the password

# update profile

# list appointments

# schedule appointment
