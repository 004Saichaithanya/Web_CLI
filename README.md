# 💾 Simulated Browser-Based Terminal (Web CLI)

A fully browser-based terminal interface that mimics a real command-line environment, with an in-memory simulated file system. No backend or actual file system access is required — all operations happen within your browser tab.

---

## 📑 Features

- ✅ Simulated **file system structure** in memory
- ✅ Classic terminal commands:
  - `mkdir` — create directories
  - `ls` — list contents
  - `cd` — change directory
  - `touch` — create files
  - `rm` — remove files
  - `rmdir` — remove empty directories
  - `mv` — rename/move files and directories
  - `cp` — copy files and directories
  - `curl` — simulate data fetch from a URL
- ✅ In-browser state management (no external file access)
- ✅ Neon green terminal theme with custom heading
- ✅ Smooth, auto-scrolling prompt interface

---

## 🎨 Tech Stack & Tools

- **HTML5**
- **Vanilla JavaScript (ES6)**
- **CSS3** for classic terminal UI styling
- In-browser **in-memory object-based file system simulation**

---

## 🖥️ How to Run

1. Clone or download this repository.
2. Open `index.html` in any modern web browser.
3. Use the terminal interface just like a real CLI.

**Example commands:**
```bash
mkdir hello
cd hello
touch file1
ls
mv file1 fileA
cp fileA fileB
curl https://example.com
````

---

## 📸 Demo Screenshot

![image](https://github.com/user-attachments/assets/9bc815a4-23a8-4153-a0e1-24c366532ec0)


---

## 📚 Project Structure

project/
│
├── index.html        # Main HTML file with terminal container and structure
├── style.css         # CSS file for terminal styling and layout
├── your-script.js    # JavaScript logic for command parsing, execution, and file system simulation
├── README.md         # Project documentation file


---

## 📌 Notes

* No actual HTTP requests are made in `curl` — it returns a simulated dummy JSON message.
* Files and directories are managed via a nested JavaScript object, representing the file system tree.
* Page refresh resets the file system.

---

## 💡 Future Enhancements (Optional)

* Add command history with Up/Down arrows.
* Implement file content storage and editing.
* Support for text files via `cat` and `echo`.
* Light/Dark theme toggle.
* Audio feedback on command execution.

---

## 🎉 Author

**Sai Chaithanya Poloju**

---

## 📜 License

Free to use for learning and personal projects.
