// Datos que no dependen del idioma
export const profile = {
  name: 'Pedro González Núñez',
  email: 'pedrogonzalezhudson@gmail.com',
  phone: '+54 9 11 5029 7907',
  phoneHref: 'tel:+5491150297907',
  location: 'Buenos Aires, Argentina',
  linkedin: 'https://www.linkedin.com/in/pedrogonzaleznunez/',
  github: 'https://github.com/pedrogonzaleznunez',
  githubUser: 'pedrogonzaleznunez',
}

export const cvUrl = (lang: 'es' | 'en') =>
  `${import.meta.env.BASE_URL}cv/CV_PedroGonzalezNunez_${lang.toUpperCase()}.pdf`
