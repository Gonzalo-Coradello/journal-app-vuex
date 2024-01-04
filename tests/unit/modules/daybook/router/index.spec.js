import { describe, expect, test } from 'vitest'
import router from '@/modules/daybook/router'

describe('Pruebas en el Daybook router', () => {
  test('el router debe tener la configuración correcta', async () => {
    expect(router).toMatchObject({
      name: 'daybook',
      component: expect.any(Function),
      children: [
        {
          path: '',
          name: 'no-entry',
          component: expect.any(Function)
        },
        {
          path: ':id',
          name: 'entry',
          component: expect.any(Function),
          props: expect.any(Function)
        }
      ]
    })

    const promiseRoutes = []
    router.children.forEach((child) => promiseRoutes.push(child.component()))

    const routes = (await Promise.all(promiseRoutes)).map((r) => r.default.name)

    expect(routes).toContain('EntryView')
    expect(routes).toContain('NoEntrySelected')
  })

  test('debe retornar el id de la ruta', () => {
    const route = {
      params: {
        id: 'ABC-123'
      }
    }

    // expect(router.children[1].props(route)).toEqual({ id: 'ABC-123' })

    const entryRoute = router.children.find((r) => r.name === 'entry')
    expect(entryRoute.props(route)).toEqual({ id: 'ABC-123' })
  })
})
