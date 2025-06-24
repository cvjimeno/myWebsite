import os

# --- Configuration ---
PROJECT_ROOT = '.'
OUTPUT_FILE = 'project_snapshot.txt'
INCLUDE_EXTENSIONS = (
    '.astro', '.html', '.css', '.js', '.ts', '.mjs', '.cjs',
    '.json', '.md', '.mdx', '.svg'
)
EXCLUDE_DIRS = {
    'node_modules', 'dist', 'build', '.git', '.astro',
    'public/assets'
}
# NEW: Add specific filenames to ignore here
EXCLUDE_FILES = {
    'package-lock.json',
    'project_snapshot.txt', # Excludes the output file itself
    'create_snapshot.py'  # Excludes the script itself
}


# --- Script Logic ---
def create_project_snapshot():
    print(f"Starting snapshot of '{os.path.abspath(PROJECT_ROOT)}'...")
    output_parts = []
    
    # Use a set for faster lookups
    exclude_files_set = set(EXCLUDE_FILES)

    for dirpath, dirnames, filenames in os.walk(PROJECT_ROOT, topdown=True):
        # Filter out excluded directories
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
        
        for filename in filenames:
            # MODIFIED: Added check to skip files in the EXCLUDE_FILES set
            if filename.endswith(INCLUDE_EXTENSIONS) and filename not in exclude_files_set:
                file_path = os.path.join(dirpath, filename)
                # Use forward slashes for cross-platform consistency
                relative_path = os.path.relpath(file_path, PROJECT_ROOT).replace('\\', '/')
                
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as infile:
                        content = infile.read()
                    
                    file_snapshot = (
                        f"--- FILE START ---\n"
                        f"Path: {relative_path}\n"
                        f"--- CONTENT ---\n"
                        f"{content}\n"
                        f"--- FILE END ---\n"
                    )
                    output_parts.append(file_snapshot)
                    print(f"  + Added: {relative_path}")
                except Exception as e:
                    print(f"  ! Error reading {relative_path}: {e}")

    try:
        # Join with two newlines for better separation
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            f.write('\n\n'.join(output_parts))
        
        print(f"\n✅ Success! Snapshot created at: {os.path.abspath(OUTPUT_FILE)}")
        print("Please copy the contents of that file and paste it into our chat.")
    except Exception as e:
        print(f"\n❌ Error writing to output file: {e}")

if __name__ == '__main__':
    create_project_snapshot()