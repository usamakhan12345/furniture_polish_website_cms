import type { Block } from 'payload'
import { anchorIdHelper } from '../fields/helpers'
import { MAP } from '../content/siteContent'

export const MapSectionBlock: Block = {
  slug: 'MapSection',
  labels: {
    singular: 'Map / Location Section',
    plural: 'Map / Location Sections',
  },
  fields: [
    anchorIdHelper('location'),
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading (e.g. Find Us)',
      defaultValue: MAP.subheading,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: MAP.heading,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: MAP.description,
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
      label: 'Workshop Address (also drives the map)',
      defaultValue: MAP.address,
    },
    {
      name: 'hours',
      type: 'text',
      label: 'Opening Hours (Optional)',
      defaultValue: MAP.hours,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number (Optional, adds a Call button)',
      defaultValue: MAP.phone,
    },
    {
      name: 'directionsLabel',
      type: 'text',
      label: 'Directions Button Text',
      defaultValue: MAP.directionsLabel,
    },
    {
      name: 'embedUrl',
      type: 'text',
      label: 'Custom Map Embed URL (Optional)',
      admin: {
        description:
          'Leave empty to show the map for the address above. To use a specific pin, paste the "Embed a map" link (or the full iframe code) from Google Maps.',
      },
    },
  ],
}
export default MapSectionBlock
