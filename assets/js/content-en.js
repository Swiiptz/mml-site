window.MML_SITE = {
    cvPath: 'rsrc/ENG_CV_Milan MULLER-LIEBRHERR.pdf',
    cvDownloadName: 'Milan_Muller_Lieberherr_CV.pdf',
    skillsData: {
            dev: {
                title: "Programming & Software",
                desc: "Robust architecture and high-performance code",
                icon: "terminal",
                colorClass: "text-primary",
                bgClass: "bg-primary/10",
                snippet: `// Backend System Architecture
public class DistributedSystem {
    private readonly ILogger _logger;
    
    public async Task HandleRequest(Request req) {
        _logger.Log("Processing...");
        await _cache.SetAsync(req.Id, req.Data);
        return new Response(200);
    }
}`,
                skills: [
                    { name: "C# (.NET / Unity)", icon: "devicon-csharp-plain", level: "75%", label: "Intermediate",hours: "+300h" },
                    { name: "Python (Scripts & Tools)", icon: "devicon-python-plain", level: "85%", label: "Advanced",hours: "+200h" },
                    { name: "C / C++ (Systems)", icon: "devicon-c-plain", level: "90%", label: "Advanced",hours: "+170h" },
                    { name: "Web (React / Tailwind)", icon: "devicon-react-original", level: "70%", label: "Intermediate",hours: "+100h" },
                    { name: "Rust", icon: "devicon-rust-plain", level: "65%", label: "Intermediate",hours: "+170h" },
                    { name: "Android Studio", icon: "devicon-android-plain", level: "40%", label: "Beginner",hours: "+90h" },
                ]
            },
            security: {
                title: "Cybersecurity & Administration",
                desc: "System hardening and network analysis",
                icon: "security",
                colorClass: "text-secondary",
                bgClass: "bg-secondary/10",
                snippet: `# Network Vulnerability Scan
$ nmap -sV -sC -p- 192.168.1.10
Starting Nmap 7.93...
Host is up (0.00042s latency).
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1
80/tcp open  http    Apache httpd 2.4.41
Scanning completed.`,
                skills: [
                    { name: "Linux / Kali", icon: "devicon-linux-plain", level: "85%", label: "Advanced",hours: "+300h" },
                    { name: "Wireshark / Nmap", icon: "material-symbols-outlined:radar", level: "20%", label: "Beginner",hours: "+30h" },
                    { name: "Bash Scripting", icon: "devicon-bash-plain", level: "50%", label: "Scolaire",hours: "+100h" },
                    { name: "Firebase", icon: "material-symbols-outlined:local_fire_department", level: "45%", label: "Beginner",hours: "+60h" },
                    { name: "Cryptographie", icon: "material-symbols-outlined:enhanced_encryption", level: "50%", label: "Scolaire",hours: "+200h" }
                ]
            },
            tools: {
                title: "Creative Tools & Workflow",
                desc: "Mastery of the multimedia production pipeline",
                icon: "palette",
                colorClass: "text-accent",
                bgClass: "bg-accent/10",
                snippet: `# Git Workflow
$ git checkout -b feature/new-ui
Switched to a new branch 'feature/new-ui'
$ git add .
$ git commit -m "feat: updated dashboard layout"
[feature/new-ui 8a2b1c] feat: updated dashboard
$ git push origin feature/new-ui`,
                skills: [
                    { name: "Git / GitHub", icon: "devicon-git-plain", level: "85%", label: "Advanced",hours: "+180h" },
                    { name: "Adobe Photoshop", icon: "devicon-photoshop-plain", level: "85%", label: "Advanced",hours: "+300h" },
                    { name: "Premiere Pro", icon: "devicon-premierepro-plain", level: "60%", label: "Basique",hours: "+150h" },
                    { name: "Jira / Trello", icon: "devicon-jira-plain", level: "65%", label: "Intermediate",hours: "+150h" },
                    { name: "Blender (Bases)", icon: "devicon-blender-original", level: "40%", label: "Beginner",hours: "+30h" }
                ]
            }
        }
};
