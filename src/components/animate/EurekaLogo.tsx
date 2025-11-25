'use client'
import { motion } from 'motion/react'

// ============================================================================
// TYPES
// ============================================================================

export type EurekaLogoVariants = 'full' | 'icon-blue' | 'icon-white' | 'icon-full-white'

interface EurekaLogoProps {
  variant?: EurekaLogoVariants
  height?: number
}

// ============================================================================
// CONSTANTS
// ============================================================================

/** Cores utilizadas na logo */
const COLORS = {
  ORANGE: '#F37021',
  BLUE: '#233E94',
  DARK: '#1a1a1a',
  WHITE: '#fff',
} as const

/** Configurações de viewBox para cada estado */
const VIEWBOX = {
  FULL: '0 0 192 69',
  ICON: '105 0 70 69',
} as const

/** Dimensões do SVG */
const SVG_DIMENSIONS = {
  WIDTH: 192,
  HEIGHT: 69,
  ICON_WIDTH: 70,
} as const

/** Centro da letra "k" - ponto de convergência para animação */
const K_CENTER = { x: 122, y: 54 } as const

/** Posições centrais aproximadas de cada letra (para cálculo de animação) */
const LETTER_POSITIONS = {
  E1: { x: 15, y: 54 },
  U: { x: 43, y: 54 },
  R: { x: 72, y: 54 },
  E2: { x: 92, y: 54 },
  A: { x: 149, y: 54 },
  G: { x: 53, y: 29 },
  R_GRUPO: { x: 64, y: 29 },
  U_GRUPO: { x: 76, y: 27 },
  P: { x: 87, y: 29 },
  O: { x: 99, y: 29 },
} as const

/** Deslocamento horizontal das bolinhas no modo icon */
const CIRCLES_OFFSET_X = -30

/** Configuração de transição padrão */
const DEFAULT_TRANSITION = {
  duration: 0.8,
  ease: 'easeInOut' as const,
}

// ============================================================================
// SVG PATHS
// ============================================================================

const SVG_PATHS = {
  CIRCLE_SMALL:
    'M175.03 29.1601C175.03 26.2997 172.71 23.9844 169.849 23.9844C166.989 23.9844 164.668 26.3051 164.668 29.1601C164.668 32.0151 166.989 34.3412 169.849 34.3412C172.71 34.3412 175.03 32.0259 175.03 29.1601Z',
  CIRCLE_LARGE:
    'M191.997 10.1949C191.997 4.56585 187.431 0 181.802 0C176.173 0 171.607 4.56585 171.607 10.1949C171.607 15.824 176.173 20.3898 181.802 20.3898C187.431 20.3898 191.997 15.824 191.997 10.1949Z',
  LETTER_E1:
    'M8.71209 48.5076C9.72133 47.331 11.1084 46.5539 12.8624 46.1761C14.6866 45.7821 16.2247 45.944 17.4552 46.6564C18.6858 47.3742 19.614 48.513 20.2347 50.0943L7.26569 52.8845C7.21712 51.1359 7.69745 49.6841 8.70669 48.5076M22.183 58.438C21.8268 59.3555 21.3249 60.1165 20.6934 60.7479C19.8569 61.5791 18.6534 62.162 17.1044 62.502C15.1939 62.9067 13.4129 62.734 11.7668 61.9623C10.1153 61.1959 8.89559 59.7765 8.12921 57.704L28.5731 53.3001C28.5623 52.8575 28.5191 52.469 28.4489 52.1397L28.2708 51.287C27.6556 48.4482 26.56 46.1329 24.9733 44.3627C23.392 42.5817 21.4544 41.3566 19.1769 40.6819C16.894 40.0181 14.4221 39.9641 11.7722 40.5362C7.9619 41.3512 5.00434 43.0566 2.9157 45.6472C0.816265 48.2485 -0.144402 51.2546 0.0175083 54.6817C0.0390963 55.1675 0.0822724 55.6586 0.152433 56.1551C0.217198 56.6462 0.30355 57.1535 0.41149 57.6555C0.98897 60.3432 2.14393 62.6099 3.86557 64.4611C5.58722 66.3122 7.67586 67.6021 10.1423 68.3361C12.5979 69.0647 15.2371 69.1349 18.0381 68.5304C20.5261 68.0015 22.5176 67.2405 24.0018 66.2745C25.4806 65.303 26.6463 64.1588 27.4829 62.8366C28.3194 61.5143 28.9725 60.0571 29.442 58.4434H22.1938L22.183 58.438Z',
  LETTER_U:
    'M39.0553 57.6393C39.0553 59.4311 39.4115 60.8182 40.1293 61.795C40.8471 62.7719 42.0021 63.2576 43.5942 63.2576C45.1863 63.2576 46.541 62.7503 47.5394 61.7357C48.5325 60.721 49.0344 59.3556 49.0344 57.6447V40.9141H56.8007V68.4009H49.0344V64.1589C48.2356 65.6323 47.14 66.8088 45.7476 67.6831C44.3552 68.5575 42.6605 69 40.669 69C37.4416 69 35.0238 68.0933 33.41 66.2799C31.7963 64.4665 30.9922 61.8706 30.9922 58.4813V40.9141H39.0607V57.6447L39.0553 57.6393Z',
  LETTER_R:
    'M76.5242 49.0375C76.0061 48.5625 75.4771 48.1794 74.9428 47.9041C74.4031 47.6235 73.7393 47.4831 72.9405 47.4831C71.4672 47.4831 70.35 48.0498 69.5944 49.1886C68.8388 50.322 68.461 51.8871 68.461 53.8786V68.3965H60.8135V40.9096H68.461V44.3151C69.2976 43.0792 70.296 42.1023 71.451 41.3845C72.6059 40.6667 73.7987 40.3105 75.0346 40.3105C76.0276 40.3105 76.9883 40.4886 77.9004 40.8502C78.8179 41.2064 79.5357 41.7461 80.0538 42.4639L76.5296 49.0375H76.5242Z',
  LETTER_E2:
    'M85.6063 51.4273H98.8722C98.5915 49.7543 97.9277 48.4374 96.8699 47.4821C95.8121 46.5269 94.3495 46.0465 92.4767 46.0465C90.604 46.0465 89.1684 46.5161 87.9379 47.4497C86.7019 48.3888 85.9248 49.7111 85.6063 51.4219M85.4228 56.3224C85.7413 58.5136 86.6264 60.1597 88.0836 61.2498C89.5354 62.3454 91.2408 62.8959 93.1945 62.8959C94.7866 62.8959 96.0819 62.5775 97.0804 61.9407C98.0788 61.3038 98.8938 60.3647 99.5306 59.1342L106.104 61.5251C105.305 62.9985 104.361 64.2937 103.265 65.4109C102.17 66.5281 100.794 67.4024 99.142 68.0393C97.4906 68.6761 95.3857 68.9945 92.8383 68.9945C89.9671 68.9945 87.4089 68.3793 85.1584 67.1434C82.9078 65.9074 81.1322 64.2074 79.8423 62.0324C78.5471 59.8628 77.8994 57.4018 77.8994 54.6547C77.8994 54.1366 77.921 53.6293 77.9588 53.1328C77.9966 52.6362 78.0559 52.1451 78.1369 51.6702C78.6928 48.2863 80.2687 45.5446 82.8593 43.456C85.4498 41.3619 88.6934 40.3203 92.6009 40.3203C95.3102 40.3203 97.7118 40.887 99.8005 42.0204C101.895 43.1537 103.524 44.7566 104.701 46.8291C105.878 48.9015 106.466 51.3895 106.466 54.2985V55.1674C106.466 55.5074 106.428 55.896 106.347 56.3332H85.4336L85.4228 56.3224Z',
  LETTER_K:
    'M126.184 40.9085H135.564L123.733 52.2638L136.756 68.3954H127.495L116.145 54.4118V68.3954H108.676V23.9512H116.145V50.5853L126.184 40.9085Z',
  LETTER_A:
    'M142.559 54.6504C142.559 57.079 143.293 59.0003 144.771 60.4197C146.245 61.8337 147.977 62.5407 149.969 62.5407C151.124 62.5407 152.241 62.2331 153.315 61.6125C154.389 60.9972 155.274 60.1013 155.976 58.9248C156.672 57.7482 157.023 56.3234 157.023 54.6504C157.023 52.9773 156.672 51.5525 155.976 50.3759C155.279 49.1994 154.394 48.3035 153.315 47.6882C152.241 47.073 151.124 46.7599 149.969 46.7599C147.977 46.7599 146.245 47.4562 144.771 48.854C143.298 50.2464 142.559 52.1785 142.559 54.6504ZM134.431 54.6504C134.431 51.5849 135.046 48.9835 136.282 46.8517C137.518 44.7199 139.142 43.0954 141.15 41.9836C143.163 40.8664 145.322 40.3105 147.632 40.3105C149.661 40.3105 151.507 40.7693 153.158 41.6868C154.81 42.6043 156.154 43.9157 157.19 45.632V40.9096H164.837V68.3965H157.19V63.6741C156.154 65.385 154.81 66.7018 153.158 67.6193C151.507 68.5368 149.661 68.9956 147.632 68.9956C145.322 68.9956 143.158 68.4397 141.15 67.3225C139.137 66.2053 137.512 64.5754 136.282 62.422C135.046 60.2686 134.431 57.6835 134.431 54.6557',
  LETTER_G:
    'M56.7011 33.8022C56.0642 34.0396 54.8121 34.3688 53.479 34.3688C51.7844 34.3688 50.5107 33.9371 49.5554 33.0304C48.6649 32.1831 48.1414 30.8608 48.1576 29.3496C48.1576 26.187 50.4135 24.1523 53.7273 24.1523C54.9578 24.1523 55.9239 24.406 56.388 24.6273L55.9886 26.1007C55.4382 25.8632 54.7689 25.6689 53.7165 25.6689C51.5793 25.6689 50.0789 26.9318 50.0789 29.2633C50.0789 31.5948 51.4768 32.8847 53.5546 32.8847C54.2076 32.8847 54.6988 32.7929 54.9362 32.6742V30.1808H53.1714V28.7398H56.7064V33.8022H56.7011Z',
  LETTER_R_GRUPO:
    'M62.79 28.8093H63.8748C65.1053 28.8093 65.8824 28.1563 65.8824 27.1632C65.8824 26.0623 65.1107 25.5603 63.9233 25.5603C63.3458 25.5603 62.9735 25.6035 62.7954 25.6467V28.8093H62.79ZM60.9766 24.3838C61.662 24.2651 62.682 24.1787 63.7398 24.1787C65.1808 24.1787 66.1577 24.4162 66.8269 24.9829C67.3774 25.4416 67.6904 26.1432 67.6904 26.9851C67.6904 28.275 66.8161 29.1547 65.877 29.4947V29.5379C66.5894 29.8078 67.0212 30.504 67.2749 31.47C67.5879 32.7168 67.8523 33.8771 68.0628 34.2603H66.1793C66.0336 33.9635 65.7961 33.1485 65.51 31.8964C65.2294 30.5903 64.7545 30.1748 63.7128 30.1424H62.79V34.2549H60.9766V24.3784V24.3838Z',
  LETTER_U_GRUPO:
    'M73.5888 24.248V30.0876C73.5888 32.0467 74.4038 32.9534 75.6397 32.9534C76.962 32.9534 77.7499 32.0467 77.7499 30.0876V24.248H79.5741V29.9689C79.5741 33.0559 77.9874 34.4268 75.5803 34.4268C73.1733 34.4268 71.7646 33.1369 71.7646 29.985V24.2534H73.5942L73.5888 24.248Z',
  LETTER_P:
    'M85.8925 29.0468C86.1138 29.1062 86.4106 29.1224 86.783 29.1224C88.1484 29.1224 88.9796 28.4531 88.9796 27.282C88.9796 26.1108 88.2078 25.5765 86.9449 25.5765C86.4376 25.5765 86.0814 25.6197 85.8925 25.6629V29.0522V29.0468ZM84.0791 24.3838C84.7321 24.2651 85.6388 24.1787 86.8694 24.1787C88.2078 24.1787 89.1847 24.4594 89.8269 24.9937C90.4206 25.4848 90.8092 26.2727 90.8092 27.2064C90.8092 28.1401 90.5123 28.9443 89.9456 29.4786C89.2171 30.2071 88.0729 30.5472 86.783 30.5472C86.443 30.5472 86.13 30.531 85.8925 30.4878V34.2603H84.0791V24.3838Z',
  LETTER_O:
    'M96.1997 29.2994C96.1997 31.3341 97.2251 32.9532 98.9792 32.9532C100.733 32.9532 101.742 31.3179 101.742 29.2239C101.742 27.3403 100.809 25.5539 98.9792 25.5539C97.1496 25.5539 96.1997 27.2324 96.1997 29.294M103.669 29.1483C103.669 32.5052 101.634 34.4212 98.8712 34.4212C96.108 34.4212 94.2676 32.2678 94.2676 29.3264C94.2676 26.3851 96.1997 24.0859 99.0223 24.0859C101.845 24.0859 103.669 26.2987 103.669 29.1483Z',
} as const

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Retorna a cor do "k" baseada na variante
 */
const getKColor = (variant: EurekaLogoVariants): string => {
  const colorMap: Record<EurekaLogoVariants, string> = {
    full: COLORS.WHITE,
    'icon-blue': COLORS.BLUE,
    'icon-white': COLORS.WHITE,
    'icon-full-white': COLORS.WHITE,
  }
  return colorMap[variant]
}

const getCirclesColor = (variant: EurekaLogoVariants): string => {
  const colorMap: Record<EurekaLogoVariants, string> = {
    full: COLORS.ORANGE,
    'icon-blue': COLORS.ORANGE,
    'icon-white': COLORS.ORANGE,
    'icon-full-white': COLORS.WHITE,
  }
  return colorMap[variant]
}

/**
 * Calcula a animação de uma letra para convergir ao centro do "k"
 */
const getLetterAnimation = (letterPosition: { x: number; y: number }, isIcon: boolean) => ({
  x: isIcon ? K_CENTER.x - letterPosition.x : 0,
  y: isIcon ? K_CENTER.y - letterPosition.y : 0,
  opacity: isIcon ? 0 : 1,
})

// ============================================================================
// COMPONENT
// ============================================================================

export function EurekaLogo({
  variant = 'full',
  height = SVG_DIMENSIONS.HEIGHT,
}: Readonly<EurekaLogoProps>) {
  const isIcon = variant !== 'full'
  const kColor = getKColor(variant)
  const circlesColor = getCirclesColor(variant)

  return (
    <motion.svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{
        viewBox: isIcon ? VIEWBOX.ICON : VIEWBOX.FULL,
        width: isIcon ? SVG_DIMENSIONS.ICON_WIDTH : SVG_DIMENSIONS.WIDTH,
        height: height,
      }}
      initial={false}
      transition={DEFAULT_TRANSITION}
    >
      {/* ===== BOLINHAS (círculos) ===== */}
      <motion.path
        d={SVG_PATHS.CIRCLE_SMALL}
        animate={{ fill: circlesColor, x: isIcon ? CIRCLES_OFFSET_X : 0 }}
        transition={DEFAULT_TRANSITION}
        initial={false}
      />
      <motion.path
        d={SVG_PATHS.CIRCLE_LARGE}
        animate={{ fill: circlesColor, x: isIcon ? CIRCLES_OFFSET_X : 0 }}
        transition={DEFAULT_TRANSITION}
        initial={false}
      />

      {/* ===== PALAVRA "eureka" ===== */}
      <motion.path
        id="e1"
        d={SVG_PATHS.LETTER_E1}
        fill={COLORS.ORANGE}
        animate={getLetterAnimation(LETTER_POSITIONS.E1, isIcon)}
        transition={DEFAULT_TRANSITION}
        initial={false}
      />
      <motion.path
        id="u"
        d={SVG_PATHS.LETTER_U}
        fill={COLORS.WHITE}
        animate={getLetterAnimation(LETTER_POSITIONS.U, isIcon)}
        transition={DEFAULT_TRANSITION}
        initial={false}
      />
      <motion.path
        id="r"
        d={SVG_PATHS.LETTER_R}
        fill={COLORS.WHITE}
        animate={getLetterAnimation(LETTER_POSITIONS.R, isIcon)}
        transition={DEFAULT_TRANSITION}
        initial={false}
      />
      <motion.path
        id="e2"
        d={SVG_PATHS.LETTER_E2}
        fill={COLORS.WHITE}
        animate={getLetterAnimation(LETTER_POSITIONS.E2, isIcon)}
        transition={DEFAULT_TRANSITION}
        initial={false}
      />
      <motion.path
        id="k"
        d={SVG_PATHS.LETTER_K}
        animate={{ fill: kColor }}
        transition={DEFAULT_TRANSITION}
        initial={false}
      />
      <motion.path
        id="a"
        d={SVG_PATHS.LETTER_A}
        fill={COLORS.WHITE}
        animate={getLetterAnimation(LETTER_POSITIONS.A, isIcon)}
        transition={DEFAULT_TRANSITION}
        initial={false}
      />

      {/* ===== PALAVRA "GRUPO" ===== */}
      <motion.path
        id="g"
        d={SVG_PATHS.LETTER_G}
        fill={COLORS.ORANGE}
        animate={getLetterAnimation(LETTER_POSITIONS.G, isIcon)}
        transition={DEFAULT_TRANSITION}
        initial={false}
      />
      <motion.path
        id="r-grupo"
        d={SVG_PATHS.LETTER_R_GRUPO}
        fill={COLORS.ORANGE}
        animate={getLetterAnimation(LETTER_POSITIONS.R_GRUPO, isIcon)}
        transition={DEFAULT_TRANSITION}
        initial={false}
      />
      <motion.path
        id="u-grupo"
        d={SVG_PATHS.LETTER_U_GRUPO}
        fill={COLORS.ORANGE}
        animate={getLetterAnimation(LETTER_POSITIONS.U_GRUPO, isIcon)}
        transition={DEFAULT_TRANSITION}
        initial={false}
      />
      <motion.path
        id="p"
        d={SVG_PATHS.LETTER_P}
        fill={COLORS.ORANGE}
        animate={getLetterAnimation(LETTER_POSITIONS.P, isIcon)}
        transition={DEFAULT_TRANSITION}
        initial={false}
      />
      <motion.path
        id="o"
        d={SVG_PATHS.LETTER_O}
        fill={COLORS.ORANGE}
        animate={getLetterAnimation(LETTER_POSITIONS.O, isIcon)}
        transition={DEFAULT_TRANSITION}
        initial={false}
      />
    </motion.svg>
  )
}
