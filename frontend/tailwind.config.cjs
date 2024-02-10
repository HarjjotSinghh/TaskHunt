/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            animation: {
                'spin-slow': 'spin 3s linear infinite',
              }
        },
    },
    plugins: [],
};
