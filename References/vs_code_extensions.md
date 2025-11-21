# VS Code Extensions Guide

## Web Development (HTML/CSS/General)

| Extension | Summary | When to Use | How to Use |
| --- | --- | --- | --- |
| **Auto Rename Tag** | Automatically updates closing tags when you rename opening tags | Writing HTML/XML | Edit opening tag; closing tag updates automatically |
| **Highlight Matching Tag** | Highlights matching opening/closing tags | Working with nested HTML | Hover over or click a tag; matching tag highlights |
| **HTML/CSS Support** | Enhanced syntax highlighting and intellisense for HTML/CSS | Building web pages | Built-in; provides autocomplete and validation |
| **Live Server** | Local server with live reload for HTML files | Testing HTML/CSS in browser | Right-click HTML file → "Open with Live Server" |
| **Tailwind CSS IntelliSense** | Autocomplete for Tailwind utility classes | Using Tailwind CSS | Start typing class name; IntelliSense suggests classes |
| **Toggle Quotes** | Toggle between single and double quotes | Switching quote style | Select text + Cmd+' (or Alt+') to cycle quotes |
| **Color Highlight** | Shows color previews in the editor | Working with colors | Colors in code display as inline swatches |
| **Bracket Pair Colorizer** | Colors matching bracket pairs differently | Complex nested code | Automatically applied; brackets color-code pairs |

## JavaScript/TypeScript Development

| Extension | Summary | When to Use | How to Use |
| --- | --- | --- | --- |
| **Quokka** | Real-time JavaScript/TypeScript output and evaluation | Quick JS/TS prototyping | Create `.js` file + Quokka icon in explorer, or cmd palette "Quokka.js: Start on Current File" |
| **Code Runner** | Execute code snippets in various languages | Testing small code blocks | Right-click file → "Run Code" or Ctrl+Alt+N |
| **Simple React Snippets** | Quick code snippets for React components | Rapid React development | Type snippet (e.g., `rcc` for class component) + Tab |
| **Console Ninja** | Shows console.log output inline in editor | Debugging without opening console | Logs appear as inline comments when file runs |
| **Add JsDoc Extension** | Generates properly formatted JSDoc comments | Documenting JavaScript functions | Type `/**` above function + Tab to auto-generate |
| **Better Comments** | Highlight comments with colors (!, TODO, ?, *) | Organizing code notes | Use `! Comment` (red), `TODO Comment` (orange), etc. |
| **ES7 React/Redux** | Snippets and syntax for React/Redux | React development | Type snippet prefix (e.g., `rcc`, `rfc`) + Tab |
| **IntelliCode** | AI-powered code completion | Any language; improves suggestions | Built-in; provides smarter IntelliSense suggestions |
| **Paste JSON as Code** | Convert JSON to typed code (JS/TS/Python) | Working with API responses | Copy JSON + Cmd+Shift+V + select language |

## React-Specific Tools

| Extension | Summary | When to Use | How to Use |
| --- | --- | --- | --- |
| **React Native Tools** | Debugging and development for React Native | Building React Native apps | Run debugger from command palette or attached device |
| **React Refactor** | Automated refactoring helpers for React | Improving React code structure | Right-click component → refactoring options |

## Linting & Code Quality

| Extension | Summary | When to Use | How to Use |
| --- | --- | --- | --- |
| **ESLint** | JavaScript linting with error/warning highlighting | Catching JS errors and style issues | Install + configure `.eslintrc`; errors show inline |
| **Prettier** | Auto-format code on save | Maintaining consistent code style | Install + set as default formatter + save file |
| **Code Spell Checker** | Highlights spelling errors in code and comments | Catching typos in names and docs | Misspellings underline; right-click for suggestions |
| **Multiple Curse Preserve** | Maintains case when doing multi-cursor edits | Batch renaming with case preservation | Multi-select + edit; case automatically preserves |

## Testing

| Extension | Summary | When to Use | How to Use |
| --- | --- | --- | --- |
| **Jest** | Jest testing framework integration | Running unit tests | Install Jest + write tests; run via terminal or extension UI |
| **Jest Runner** | Visual test runner with inline results | Debugging individual tests | Click "Run" or "Debug" icon next to test |

## Version Control & Collaboration

| Extension | Summary | When to Use | How to Use |
| --- | --- | --- | --- |
| **GitLens** | Git blame, history, and authorship info | Understanding code changes and history | Hover over code; click to see git history/blame |
| **Rapid API** | API testing and development | Testing APIs without Postman | Open sidebar → create requests → send |

## Remote Development

| Extension | Summary | When to Use | How to Use |
| --- | --- | --- | --- |
| **Remote SSH** | Connect and develop on remote machines via SSH | Working on remote servers | Install + "Remote-SSH: Connect to Host" + enter SSH address |
| **Remote Containers** | Develop inside Docker containers | Container-based development environments | Open folder in container or attach to running container |
| **Remote Repositories** | Browse and edit GitHub repos without cloning | Quick edits to remote repos | Open command palette → "Open Remote Repository" |
| **Dev Containers** | Define development environment in `.devcontainer` | Team collaboration with consistent environments | Create `.devcontainer/devcontainer.json` + reopen in container |
| **WSL** | Develop using Windows Subsystem for Linux | Linux development on Windows | Install + "Remote-WSL: Reopen in WSL" |

## Docker & Containerization

| Extension | Summary | When to Use | How to Use |
| --- | --- | --- | --- |
| **Docker** | Docker container and image management | Managing Docker containers/images | Use sidebar to view, run, stop containers |
| **Docker Compose** | Docker Compose file syntax support | Multi-container applications | Edit `docker-compose.yml`; syntax highlighting + IntelliSense |
| **Container Tools** | Extended container management features | Advanced container operations | Available via command palette |

## Python Development

| Extension | Summary | When to Use | How to Use |
| --- | --- | --- | --- |
| **Python** | Core Python support and IntelliSense | Python development | Install + select interpreter; syntax highlighting + IntelliSense built-in |
| **Python Debugger** | Integrated Python debugging | Debugging Python scripts | Set breakpoints + Run → Start Debugging (F5) |
| **Python Indent** | Smart Python indentation | Writing Python with proper indentation | Automatic; fixes indentation based on context |
| **Jupyter** | Jupyter notebook support in VS Code | Running Jupyter notebooks | Create `.ipynb` file + run cells interactively |
| **Jupyter Cell Tags** | Organize Jupyter notebooks with cell tags | Large notebook organization | Add tags to cells; organize and filter by tag |

## C/C++ Development

| Extension | Summary | When to Use | How to Use |
| --- | --- | --- | --- |
| **C/C++** | Core C/C++ support, IntelliSense, debugging | C/C++ projects | Install + configure compiler; debug with F5 |
| **C/C++ Themes** | Syntax themes optimized for C/C++ | Improving C/C++ readability | Select from themes in settings |

## Markdown & Documentation

| Extension | Summary | When to Use | How to Use |
| --- | --- | --- | --- |
| **Markdown All in One** | Complete Markdown support (preview, shortcuts, TOC) | Writing Markdown documentation | Write `.md` files; preview + keyboard shortcuts included |
| **Markdown Preview Enhanced** | Advanced Markdown preview with extensions | Complex Markdown with diagrams/code | Open preview panel; supports mermaid, PlantUML, etc. |
| **Auto-Open Markdown Preview** | Automatically opens preview when editing Markdown | Markdown documentation writing | Automatically opens; toggle with Cmd+Shift+V |

## Data & Configuration Files

| Extension | Summary | When to Use | How to Use |
| --- | --- | --- | --- |
| **.env** | Syntax highlighting and IntelliSense for `.env` files | Environment variable file editing | Open `.env` file; highlighting + variable suggestions |
| **YAML** | YAML syntax support and validation | YAML configuration files | Edit `.yaml`/`.yml` files; validation built-in |
| **Rainbow CSV** | Color-codes CSV columns for readability | Viewing CSV files | Open CSV; columns display in different colors |
| **vscode-pdf** | PDF viewer in VS Code | Quick PDF review without external app | Right-click PDF → "Preview" or double-click |

## Productivity & UI

| Extension | Summary | When to Use | How to Use |
| --- | --- | --- | --- |
| **Peacock** | Color code workspace windows | Managing multiple workspaces | Command palette → "Peacock: Enter Color" + pick color |
| **VS Code Pets** | Animated pets in sidebar for fun | Adding personality to your editor | Install; pets appear in activity bar; click to interact |
| **Code Snapshot** | Create shareable code screenshots | Sharing code in docs/social media | Select code + command palette → "Snapshot" |
| **To Do Tree** | Highlight and organize TODO/FIXME comments | Task management in code | Comments with `TODO:` or `FIXME:` appear in sidebar |

## Themes & Icons

| Extension | Summary | When to Use | How to Use |
| --- | --- | --- | --- |
| **Bearded Theme** | Popular dark theme with warm colors | Personal preference | Select from Themes in settings |
| **Material Icon Theme** | Modern file and folder icons | Visual file organization | Install + select from Themes → File Icons |

## AI & Advanced Tools

| Extension | Summary | When to Use | How to Use |
| --- | --- | --- | --- |
| **Claude Code** | Claude AI integration for coding tasks | AI-assisted coding and refactoring | Install + authenticate; use chat alongside code |

## Quick Reference: Command Palette Access
Many extensions are accessed via **Command Palette** (Cmd+Shift+P / Ctrl+Shift+P). Search for the extension name or specific commands.
