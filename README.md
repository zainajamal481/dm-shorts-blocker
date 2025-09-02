# DM Shorts Blocker

A Chrome and Firefox extension that blocks access to video shorts and hides related elements on the page.

## 🚀 Features

- **Shorts Blocking**: Automatically redirects from shorts pages to homepage
- **Element Hiding**: Removes shorts blocks from homepage and recommendations
- **Link Blocking**: Prevents navigation to shorts links
- **Notifications**: Shows notifications about blocked actions
- **Statistics**: Tracks the number of blocked elements and redirects
- **Management**: Simple interface to enable/disable blocking

## 📦 Installation

### Chrome/Edge

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked extension"
5. Select the extension folder

### Firefox

1. Download or clone this repository
2. Open Firefox and go to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file from the extension folder

## 🎯 Usage

1. After installing the extension, an icon will appear in the toolbar on video platforms
2. Click the icon to open the popup window
3. Use the toggle switch to enable/disable blocking
4. View statistics of blocked elements
5. Use the "Refresh page" button to apply changes

## ⚙️ Settings

The extension works automatically after installation. Main settings:

- **Blocking Active**: Enable/disable Shorts blocking
- **Statistics**: View count of blocked elements
- **Refresh Page**: Force apply blocking

## 🔧 Technical Details

### Extension Files

- `manifest.json` - Extension configuration
- `content.js` - Main blocking script
- `background.js` - Background script
- `popup.html/css/js` - Management interface
- `styles.css` - Styles for hiding elements
- `icons/` - Extension icons

### How It Works

1. **Content Script** loads on all video platform pages
2. **DOM Observer** monitors page changes
3. **URL Checker** checks current URL for shorts
4. **Element Hider** hides shorts blocks
5. **Link Blocker** prevents navigation via links

## 🐛 Troubleshooting

### Extension Not Working

1. Make sure the extension is enabled
2. Check that you're on a supported video platform
3. Try refreshing the page
4. Check browser console for errors

### Some Shorts Still Visible

1. Video platforms may load content dynamically
2. Try refreshing the page
3. Extension will automatically hide new elements

### Performance Issues

1. Extension is optimized for minimal performance impact
2. Uses efficient CSS selectors
3. Minimal DOM operations

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit pull requests, report bugs, and suggest features.

## 📋 Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🔒 Security

If you discover a security vulnerability, please report it privately. See our [Security Policy](SECURITY.md) for details.

## 🤝 Support

If you encounter problems or have suggestions for improvement:

1. Create an Issue in the repository
2. Describe the problem in detail
3. Specify browser version and OS

## 📋 Version History

See [CHANGELOG.md](CHANGELOG.md) for a complete list of changes and version history.

## 🔄 Updates

To update the extension:

1. Download new version
2. Remove old extension
3. Install new version
4. Settings will be saved automatically

### Current Version: 1.0.0

- ✅ Chrome/Edge support
- ✅ Firefox support
- ✅ YouTube Shorts blocking
- ✅ Element hiding
- ✅ Statistics tracking
- ✅ User interface

---

**Warning**: This extension is designed to increase productivity and reduce distractions. Use responsibly!
