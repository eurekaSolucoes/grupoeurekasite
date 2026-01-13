/**
 * Footer Mock Data
 *
 * Estrutura de dados mock para o footer do site.
 * Esta estrutura é independente do CMS e serve como placeholder
 * até que a estrutura final seja definida.
 */

export interface FooterData {
  contactInfo: {
    address: string
    phone: string
  }
  navColumns: Array<{
    title: string
    links: Array<{
      label: string
      href: string
    }>
  }>
  socialLinks: Array<{
    platform: 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok'
    url: string
  }>
  legal: {
    copyrightText: string
    developerCredit: string
  }
}

export const footerMockData: FooterData = {
  contactInfo: {
    address: 'Av. Brasil 2241, Jardim América, São Paulo/SP',
    phone: '(11) 5549-1702',
  },
  navColumns: [
    {
      title: 'Soluções',
      links: [
        { label: 'Obras', href: '#' },
        { label: 'Coleções', href: '#' },
        { label: 'Plataforma digital', href: '#' },
        { label: 'Formação', href: '#' },
        { label: 'Materiais customizados', href: '#' },
      ],
    },
    {
      title: 'Acesso',
      links: [
        { label: 'Quem somos', href: '#' },
        { label: 'Nossos cases', href: '#' },
        { label: 'Impactos positivos', href: '#' },
        { label: 'Editora', href: '#' },
        { label: 'Fale conosco', href: '#' },
      ],
    },
  ],
  socialLinks: [
    { platform: 'facebook', url: 'https://facebook.com/eureka' },
    { platform: 'instagram', url: 'https://instagram.com/eureka' },
    { platform: 'linkedin', url: 'https://linkedin.com/company/eureka' },
    { platform: 'youtube', url: 'https://youtube.com/@eureka' },
    { platform: 'tiktok', url: 'https://tiktok.com/@eureka' },
  ],
  legal: {
    copyrightText:
      '© Grupo Eureka | CNPJ 06.987.817/0001-23. Todos os direitos reservados. Política de Privacidade',
    developerCredit: 'Desenvolvido por SIOUX',
  },
}
