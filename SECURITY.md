# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| 0.9.x   | :x:                |
| < 0.9   | :x:                |

## Reporting a Vulnerability

We take the security of YouTube Shorts Blocker seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Reporting Process

1. **Do not create a public GitHub issue** for the vulnerability
2. **Email us directly** at fami1ycrea1or@gmail.com
3. **Include detailed information** about the vulnerability:
   - Description of the issue
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Include in Your Report

- **Clear description** of the vulnerability
- **Steps to reproduce** the issue
- **Browser and version** where the issue occurs
- **Extension version** being tested
- **Potential impact** assessment
- **Proof of concept** (if applicable)

### Response Timeline

- **Initial response**: Within 48 hours
- **Status update**: Within 1 week
- **Resolution**: Depends on complexity, typically 2-4 weeks

### Responsible Disclosure

We follow responsible disclosure practices:

1. **Private reporting** - Report vulnerabilities privately first
2. **Timely response** - We will acknowledge receipt within 48 hours
3. **Collaborative resolution** - Work together to fix the issue
4. **Public disclosure** - Only after the fix is available
5. **Credit acknowledgment** - Proper credit to reporters

## Security Best Practices

### For Users

1. **Keep the extension updated** to the latest version
2. **Only install from trusted sources** (Chrome Web Store, Firefox Add-ons)
3. **Report suspicious behavior** immediately
4. **Review permissions** before installation

### For Developers

1. **Follow secure coding practices**
2. **Regular security audits** of the codebase
3. **Dependency updates** for known vulnerabilities
4. **Input validation** and sanitization
5. **Content Security Policy** compliance

## Known Security Considerations

### Extension Permissions

This extension requires the following permissions:

- `*://*.youtube.com/*` - To access YouTube pages
- `storage` - To save user preferences
- `notifications` - To show blocking notifications

### Data Handling

- **No personal data collection** - The extension does not collect or transmit personal information
- **Local storage only** - All settings are stored locally in the browser
- **No external analytics** - No tracking or analytics services are used

### Privacy Protection

- **No data logging** - Extension does not log user activity
- **No network requests** - Extension does not make external API calls
- **Local processing** - All blocking logic runs locally

## Security Updates

### Regular Updates

- **Monthly security reviews** of dependencies
- **Quarterly code audits** for security issues
- **Immediate response** to critical vulnerabilities

### Update Process

1. **Vulnerability assessment** and prioritization
2. **Fix development** and testing
3. **Security review** of the fix
4. **Release planning** and coordination
5. **User notification** of the update

## Contact Information

### Security Team

- **Email**: fami1ycrea1or@gmail.com
- **Response time**: 48 hours maximum
- **Language**: English preferred

### Alternative Contacts

If you cannot reach the security team:

1. **Create a private issue** with [SECURITY] prefix
2. **Contact maintainers** through GitHub
3. **Use project discussions** for general security questions

## Acknowledgments

We thank all security researchers and community members who responsibly report vulnerabilities. Your contributions help make YouTube Shorts Blocker more secure for everyone.

---

**Note**: This security policy is a living document and may be updated as the project evolves. Please check back regularly for the latest information.
