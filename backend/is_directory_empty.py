import os

def is_directory_empty(dir_path):
    """
    Checks if the given directory path is empty.
    Returns True if the directory is empty or doesn't exist, False otherwise.
    """
    if not os.path.exists(dir_path):
        return True  # Or raise an error, depending on the desired behavior
    
    return not os.listdir(dir_path)

# Example usage with your 'uploads' directory
uploads_dir = r"uploads"
if is_directory_empty(uploads_dir):
    print("The 'uploads' directory is empty.")
else:
    print("The 'uploads' directory is not empty.")