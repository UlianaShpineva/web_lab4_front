/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}",],
    theme: {
        screens: {
            sm: '480px',
            md: '810px',
            lg: '1191px',
            xl: '1440px',
        }
        // extend: {
        //     colors: {
        //         'text-color': '#05060A',
        //         'background-color': '#F9FAFC',
        //         'primary': '#5D66B5',
        //         'secondary': '#C6D099',
        //         'accent': '#78C18C',
        //     },
        // },
    },
    plugins: [],
}