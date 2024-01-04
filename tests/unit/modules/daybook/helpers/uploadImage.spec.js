import uploadImage from '@/modules/daybook/helpers/uploadImage'
import axios from 'axios'
import { describe, expect, test } from 'vitest'
import cloudinary from 'cloudinary'

cloudinary.config({
  cloud_name: import.meta.env.VITE_CLOUDINARY_NAME,
  api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET
})

describe('Pruebas en uploadImage', () => {
  test('debe cargar un archivo y retornar el URL', async () => {
    const { data } = await axios.get(
      'https://res.cloudinary.com/dqkb4ydrr/image/upload/v1704377930/curso-vue/mcbhdoo32dlmyxijdi9g.jpg',
      {
        responseType: 'arraybuffer'
      }
    )

    const file = new File([data], 'foto.jpg')

    const url = await uploadImage(file)

    expect(typeof url).toBe('string')

    const segments = url.split('/')
    const imageId = segments[segments.length - 1].replace('.jpg', '')

    const result = await cloudinary.v2.api.delete_resources([imageId])
    expect(result.deleted).toBeTruthy()
  })
})
