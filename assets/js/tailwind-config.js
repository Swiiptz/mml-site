tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        display: ['Space Grotesk', 'sans-serif'],
                        mono: ['Fira Code', 'monospace'],
                    },
                    colors: {
                        bg: '#030305',
                        surface: '#0E0E11',
                        surfaceHighlight: '#1A1A20',
                        primary: '#6366f1', // Indigo-500
                        primaryDark: '#4f46e5', // Indigo-600
                        secondary: '#a855f7', // Purple-500
                        accent: '#22d3ee', // Cyan-400
                    },
                    animation: {
                        'float': 'float 6s ease-in-out infinite',
                        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        'spin-slow': 'spin 12s linear infinite',
                        'blob': 'blob 7s infinite',
                        'shimmer': 'shimmer 2s infinite',
                        'typing': 'typing 2s steps(20)',
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-20px)' },
                        },
                        blob: {
                            '0%': { transform: 'translate(0px, 0px) scale(1)' },
                            '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                            '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                            '100%': { transform: 'translate(0px, 0px) scale(1)' },
                        },
                        shimmer: {
                            '0%': { transform: 'translateX(-100%)' },
                            '100%': { transform: 'translateX(100%)' }
                        },
                        typing: {
                            '0%': { width: '0' },
                            '100%': { width: '100%' }
                        }
                    }
                }
            }
        }
