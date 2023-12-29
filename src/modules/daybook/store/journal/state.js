export default () => ({
  isLoading: true,
  entries: [
    {
      id: new Date().getTime(),
      date: new Date().toDateString(),
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus rem at ducimus repellendus odio eos libero molestias officia illum temporibus commodi omnis, odit quas laudantium quo ipsa natus tempore magni.',
      picture: null,
    },
    {
      id: new Date().getTime() + 1000,
      date: new Date().toDateString(),
      text: 'In, nobis similique! Voluptas, qui nobis maxime explicabo, laborum beatae consectetur laboriosam tempore dignissimos libero quas dolor voluptates odio temporibus? Voluptatum eligendi tempora nobis expedita qui provident perferendis quo reiciendis aperiam iure? Magni deleniti quaerat accusantium atque nisi!',
      picture: null,
    },
    {
      id: new Date().getTime() + 2000,
      date: new Date().toDateString(),
      text: 'Repellendus consequatur atque accusamus iste vel sequi eveniet eos rem. Illum, ea? Rerum maxime quasi, quidem saepe temporibus facilis nesciunt sed nisi perspiciatis magni animi reprehenderit vitae error fuga, quaerat ad, excepturi assumenda quas autem enim!',
      picture: null,
    },
  ]
})
