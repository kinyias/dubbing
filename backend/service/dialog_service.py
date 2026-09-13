import sys
import os
import logging
import subprocess
from typing import Optional, List, Union

logger = logging.getLogger("dialog_service")


def open_file_dialog_ps(title: str = "Chọn file", filter_str: str = "All Files (*.*)|*.*", multiselect: bool = False) -> Union[Optional[str], List[str]]:
    """Opens Windows OpenFileDialog via PowerShell as a fallback."""
    multi_flag = "$dialog.Multiselect = $true;" if multiselect else "$dialog.Multiselect = $false;"
    ps_script = f"""
    Add-Type -AssemblyName System.Windows.Forms
    $dialog = New-Object System.Windows.Forms.OpenFileDialog
    $dialog.Title = "{title}"
    $dialog.Filter = "{filter_str}"
    {multi_flag}
    if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {{
        if ($dialog.Multiselect) {{
            $dialog.FileNames | ConvertTo-Json -Compress
        }} else {{
            $dialog.FileName
        }}
    }}
    """
    try:
        res = subprocess.run(
            ["powershell", "-NoProfile", "-Sta", "-Command", ps_script],
            capture_output=True,
            text=True,
            timeout=120
        )
        out = res.stdout.strip()
        if not out:
            return [] if multiselect else None
        if multiselect:
            import json
            try:
                parsed = json.loads(out)
                return parsed if isinstance(parsed, list) else [parsed]
            except Exception:
                return [out]
        return out
    except Exception as e:
        logger.error(f"PowerShell dialog failed: {e}")
        return [] if multiselect else None


def open_video_dialog(multiple: bool = False) -> Union[Optional[str], List[str]]:
    """Opens native file picker for video files."""
    try:
        import tkinter as tk
        from tkinter import filedialog
        
        root = tk.Tk()
        root.withdraw()
        root.attributes("-topmost", True)
        
        filetypes = [
            ("Video Files", "*.mp4 *.mkv *.avi *.mov *.webm *.wmv *.m4v *.flv *.ts"),
            ("All Files", "*.*")
        ]
        
        if multiple:
            res = filedialog.askopenfilenames(title="Chọn Video", filetypes=filetypes)
            root.destroy()
            return list(res) if res else []
        else:
            res = filedialog.askopenfilename(title="Chọn Video", filetypes=filetypes)
            root.destroy()
            return res if res else None
    except Exception as e:
        logger.warning(f"Tkinter dialog failed, trying PowerShell: {e}")
        filter_str = "Video Files (*.mp4;*.mkv;*.avi;*.mov;*.webm;*.wmv)|*.mp4;*.mkv;*.avi;*.mov;*.webm;*.wmv|All Files (*.*)|*.*"
        return open_file_dialog_ps(title="Chọn Video", filter_str=filter_str, multiselect=multiple)


def open_folder_dialog() -> Optional[str]:
    """Opens native folder picker."""
    try:
        import tkinter as tk
        from tkinter import filedialog
        
        root = tk.Tk()
        root.withdraw()
        root.attributes("-topmost", True)
        
        res = filedialog.askdirectory(title="Chọn Thư Mục")
        root.destroy()
        return res if res else None
    except Exception as e:
        logger.warning(f"Tkinter folder dialog failed: {e}")
        ps_script = """
        Add-Type -AssemblyName System.Windows.Forms
        $dialog = New-Object System.Windows.Forms.FolderBrowserDialog
        $dialog.Description = "Chọn Thư Mục"
        if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {
            $dialog.SelectedPath
        }
        """
        try:
            res = subprocess.run(
                ["powershell", "-NoProfile", "-Sta", "-Command", ps_script],
                capture_output=True,
                text=True,
                timeout=120
            )
            out = res.stdout.strip()
            return out if out else None
        except Exception as ex:
            logger.error(f"PowerShell folder dialog failed: {ex}")
            return None


def open_media_dialog() -> Optional[str]:
    """Opens native file picker for audio/video media files."""
    try:
        import tkinter as tk
        from tkinter import filedialog
        
        root = tk.Tk()
        root.withdraw()
        root.attributes("-topmost", True)
        
        filetypes = [
            ("Media Files", "*.mp4 *.mp3 *.wav *.m4a *.aac *.mkv *.avi *.mov *.webm *.wmv *.flv"),
            ("All Files", "*.*")
        ]
        
        res = filedialog.askopenfilename(title="Chọn Tệp Media", filetypes=filetypes)
        root.destroy()
        return res if res else None
    except Exception as e:
        logger.warning(f"Tkinter media dialog failed: {e}")
        return open_file_dialog_ps(title="Chọn Tệp Media")


def save_file_dialog(title: str = "Lưu file", default_ext: str = ".mp4", filetypes: list = None) -> Optional[str]:
    """Opens native save file dialog."""
    try:
        import tkinter as tk
        from tkinter import filedialog
        
        root = tk.Tk()
        root.withdraw()
        root.attributes("-topmost", True)
        
        if not filetypes:
            filetypes = [("Files", f"*{default_ext}"), ("All Files", "*.*")]
            
        res = filedialog.asksaveasfilename(title=title, defaultextension=default_ext, filetypes=filetypes)
        root.destroy()
        return res if res else None
    except Exception as e:
        logger.warning(f"Tkinter save file dialog failed: {e}")
        return None
