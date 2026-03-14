import os
import shutil

def cleanup():
    base_path = r"c:\Users\agark\OneDrive\Desktop\CompanionAI"
    
    # Files to remove
    files_to_remove = [
        os.path.join(base_path, "Phase1.7z"),
        os.path.join(base_path, "package.json"),
        os.path.join(base_path, "package-lock.json"),
    ]
    
    # Directories to remove
    dirs_to_remove = [
        os.path.join(base_path, "node_modules"),
        os.path.join(base_path, "frontend", "dist"),
        os.path.join(base_path, "backend", "api", "__pycache__"),
        os.path.join(base_path, "backend", "core", "__pycache__"),
        os.path.join(base_path, "backend", "db", "__pycache__"),
        os.path.join(base_path, "backend", "services", "__pycache__"),
    ]
    
    print("Starting cleanup...")
    
    for f in files_to_remove:
        if os.path.exists(f):
            try:
                os.remove(f)
                print(f"Removed: {f}")
            except Exception as e:
                print(f"Error removing {f}: {e}")
        else:
            print(f"Skipped (not found): {f}")
            
    for d in dirs_to_remove:
        if os.path.exists(d):
            try:
                shutil.rmtree(d)
                print(f"Removed: {d}")
            except Exception as e:
                print(f"Error removing {d}: {e}")
        else:
            print(f"Skipped (not found): {d}")
            
    print("Cleanup complete.")

if __name__ == "__main__":
    cleanup()
