import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
// Novos blocos
import { SpacerBlock } from '@/blocks/SpacerBlock/Component'
import { AlternatingBlock } from '@/blocks/AlternatingBlock/Component'
import { CardGridBlock } from '@/blocks/CardGridBlock/Component'
import { IconInfoListBlock } from '@/blocks/IconInfoListBlock/Component'
import { TextImageStackBlock } from '@/blocks/TextImageStackBlock/Component'
import { ImageTextGridBlock } from '@/blocks/ImageTextGridBlock/Component'
import { OverlappingImageBlock } from '@/blocks/OverlappingImageBlock/Component'
import { StatsBlock } from '@/blocks/StatsBlock/Component'
import { SocialCTABlock } from '@/blocks/SocialCTABlock/Component'
import { NumberedCardsBlock } from '@/blocks/NumberedCardsBlock/Component'
import { SplitContentBlock } from '@/blocks/SplitContentBlock/Component'
import { AccordionListBlock } from '@/blocks/AccordionListBlock/Component'
import { ImageBlock } from '@/blocks/ImageBlock/Component'
import { VideoBlock } from '@/blocks/VideoBlock/Component'

const blockComponents = {
  // Existentes
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  // Novos
  spacerBlock: SpacerBlock,
  alternatingBlock: AlternatingBlock,
  cardGridBlock: CardGridBlock,
  iconInfoListBlock: IconInfoListBlock,
  textImageStackBlock: TextImageStackBlock,
  imageTextGridBlock: ImageTextGridBlock,
  overlappingImageBlock: OverlappingImageBlock,
  statsBlock: StatsBlock,
  socialCTABlock: SocialCTABlock,
  numberedCardsBlock: NumberedCardsBlock,
  splitContentBlock: SplitContentBlock,
  accordionListBlock: AccordionListBlock,
  imageBlock: ImageBlock,
  videoBlock: VideoBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              // @ts-expect-error there may be some mismatch between the expected types here
              return <Block key={block.id ?? index} {...block} />
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
