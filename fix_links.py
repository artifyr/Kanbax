import os
import re

site_dir = r"d:\CODING\WebDev\Sprinto\site"
files = [f for f in os.listdir(site_dir) if f.endswith(".html")]

mappings = [
    (r'href="#"[^>]*>.*?Dashboard', 'href="index.html">Dashboard'),
    (r'href="#"[^>]*>.*?Backlog', 'href="backlog.html">Backlog'),
    (r'href="#"[^>]*>.*?Active Sprints', 'href="active_sprints.html">Active Sprints'),
    (r'href="#"[^>]*>.*?Reports', 'href="reports.html">Reports'),
    (r'href="#"[^>]*>.*?Calendar', 'href="calendar.html">Calendar'),
    (r'href="#"[^>]*>.*?List', 'href="backlog.html">List'),
    (r'href="#"[^>]*>.*?Projects', 'href="backlog.html">Projects'),
    (r'href="#"[^>]*>.*?Tasks', 'href="active_sprints.html">Tasks'),
    (r'href="#"[^>]*>.*?Create Task', 'href="create_task.html">Create Task'),
]

# Specifically for the index.html created by Stitch which has slightly different structures
extra_mappings = [
    ('href="#"', 'href="index.html"', 'Dashboard'),
    ('href="#"', 'href="backlog.html"', 'Projects'),
    ('href="#"', 'href="active_sprints.html"', 'Tasks'),
    ('href="#"', 'href="reports.html"', 'Reports'),
    ('href="#"', 'href="calendar.html"', 'Calendar'),
]

for filename in files:
    filepath = os.path.join(site_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for pattern, replacement in mappings:
        new_content = re.sub(pattern, replacement, new_content, flags=re.IGNORECASE | re.DOTALL)
    
    # Specific fix for buttons that don't have text directly inside the <a> tag but in children
    new_content = new_content.replace('href="#"', 'javascript:void(0)') # Fallback
    
    # Let's try a more robust approach for the sidebar links
    sidebar_links = {
        "Dashboard": "index.html",
        "Backlog": "backlog.html",
        "Active Sprints": "active_sprints.html",
        "Reports": "reports.html",
        "Calendar": "calendar.html",
        "Create Task": "create_task.html",
        "Projects": "backlog.html",
        "Tasks": "active_sprints.html"
    }
    
    for text, link in sidebar_links.items():
        # Match <a ... href="#" ... > ... text ... </a>
        pattern = rf'href=["\'](?:#|javascript:void\(0\))["\']([^>]*>.*?{text})'
        new_content = re.sub(pattern, f'href="{link}"\\1', new_content, flags=re.IGNORECASE | re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Links fixed across all pages.")
