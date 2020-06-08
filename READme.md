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

**RF**

- User should be able to update name, email and password

**RN**

- User cannot change email to email already in use.
- To update password user needs to inform of old password
- To update password user needs to confirm password

# list appointments

**RF**

- User should be able to see all registered service providers.
- User should be able to see available appointments for a specific provider
- User should be able to see all available appointments for a specific provider
- User should be able to book appointment

**RNF**

- List of service providers needs to be saved in cache

**RN**

- Appointments last an hour.
- Appointments avaiable between 8h - 17h
- User cannot book on unavailable date
- User cannot book past dates
- User cannot book appointment with self

# schedule appointment
