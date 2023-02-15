<script lang="ts">
import { defineComponent } from 'vue';
import FractionChoose, { type Filters } from '@/components/deck-builder-view/FractionChoose.vue';
import CardCollection from '@/components/deck-builder-view/CardsCollection.vue';
import InfoCollection from '@/components/deck-builder-view/InfoCollection.vue';
import type Card from '@/interfaces/card';
import type { CardAPI, UserCard } from '@/interfaces/cardAPI';
import { getCards, getUserCards } from '@/api/deckAPI';

export default defineComponent({
  data() {
    return {
      collectionFilter: 'all' as Filters,
      deckFilter: 'all' as Filters,
      currentFraction: 1,
      collectionCards: [
        {
          id: 1,
          name: 'Геральт из Ривии',
          type: 'hero',
          image: 'src/assets/images/neu_geralt.png',
          description: 'Если надо выбирать между одни злом и другим, я предпочитаю не выбирать.',
          fractionId: null,
          ability: null,
          fieldType: ['melee'],
          power: 15,
          quantity: 10,
        },
        {
          id: 228,
          name: 'Цирилла',
          type: 'hero',
          image: 'src/assets/images/neutral_ciri.jpg',
          description: 'Знаешь, когда сказки перестают быть сказками? Когда в них начинают верить.',
          fractionId: null,
          ability: null,
          fieldType: ['melee'],
          power: 15,
          quantity: 1,
        },
        {
          id: 2,
          name: 'Катапульта',
          type: 'usual',
          image: 'src/assets/images/nor_catapult_1.png',
          description: 'Боги на стороне того, у кого лучше катапульты...',
          fractionId: 1,
          ability: 'bond',
          fieldType: ['siege'],
          power: 8,
          quantity: 5,
        },
        {
          id: 3,
          name: 'Детмольд',
          type: 'usual',
          image: 'src/assets/images/nor_dethmold.png',
          description: 'Такими чарами выиграывают войны! Тысячи жертв в одну минуту!',
          fractionId: 1,
          ability: null,
          fieldType: ['range'],
          power: 6,
          quantity: 1,
        },
        {
          id: 4,
          name: 'Рубайлы из Кринфрида',
          type: 'usual',
          image: 'src/assets/images/nor_crinfrid.png',
          description: 'Записались мы на войну, а то с чудищами последнее время нам не шибко везет.',
          fractionId: 1,
          ability: 'bond',
          fieldType: ['range'],
          power: 5,
          quantity: 3,
        },
        {
          id: 5,
          name: 'Боец Синих Полосок',
          type: 'usual',
          image: 'src/assets/images/nor_blue_stripes.png',
          description: 'Для Темерии я готов на все. Но обычно я для нее только убиваю.',
          fractionId: 1,
          ability: 'bond',
          fieldType: ['melee'],
          power: 4,
          quantity: 3,
        },
        {
          id: 6,
          name: 'Морвран Воорхис',
          type: 'hero',
          image: 'src/assets/images/nil_moorvran.png',
          description: '- А ты кто? Цирюльник? - Нет. Морван Воорхис. Командующий дивизией "Альба"',
          fractionId: 2,
          ability: null,
          fieldType: ['siege'],
          power: 10,
          quantity: 2,
        },
        {
          id: 7,
          name: 'Тибор Эггебрахт',
          type: 'hero',
          image: 'src/assets/images/nil_tibor.png',
          description: 'Вперед, "Альба"! Да здравствует император!',
          fractionId: 2,
          ability: null,
          fieldType: ['range'],
          power: 10,
          quantity: 1,
        },
        {
          id: 8,
          name: 'Лето из Гулеты',
          type: 'hero',
          image: 'src/assets/images/nil_letho.png',
          description: 'Еще ни один ведьмак не умер от старости, в постели, диктуя завещание.',
          fractionId: 2,
          ability: null,
          fieldType: ['melee'],
          power: 10,
          quantity: 1,
        },
        {
          id: 9,
          name: 'Лучник Бурой Хоругви',
          type: 'usual',
          image: 'src/assets/images/nil_black_archer.png',
          description: 'Я всегда бью по коленям.',
          fractionId: 2,
          ability: null,
          fieldType: ['range'],
          power: 10,
          quantity: 2,
        },
        {
          id: 10,
          name: 'Мильва',
          type: 'usual',
          image: 'src/assets/images/sco_milva.png',
          description: 'Она подкинула лук, мягко натянула тетиву, прицелилась уже во время натяжения...',
          fractionId: 3,
          ability: 'medic',
          fieldType: ['range'],
          power: 10,
          quantity: 15,
        },
        {
          id: 11,
          name: 'Изенгрим Фаоильтиарна',
          type: 'hero',
          image: 'src/assets/images/sco_isengrim.png',
          description: 'Железный Волк, славнейший, уже почти легендарный командир скоя`таэлей.',
          fractionId: 3,
          ability: 'medic',
          fieldType: ['melee'],
          power: 10,
          quantity: 1,
        },
        {
          id: 12,
          name: 'Следопыт из Дол Блатанны',
          type: 'usual',
          image: 'src/assets/images/sco_dol_infantry_1.png',
          description: 'Нюх у них, как у гончих. Глаза, как у орла. А сердца изо льда.',
          fractionId: 3,
          ability: 'agile',
          fieldType: ['melee', 'range'],
          power: 6,
          quantity: 1,
        },
        {
          id: 13,
          name: 'Ведьма: Пряха',
          type: 'usual',
          image: 'src/assets/images/nml_witch_velen_1.png',
          description: 'Я чую твою боль, вижу страх...',
          fractionId: 4,
          ability: 'muster',
          fieldType: ['melee'],
          power: 6,
          quantity: 1,
        },
        {
          id: 14,
          name: 'Элементаль земли',
          type: 'usual',
          image: 'src/assets/images/nml_earth_elemental.png',
          description: 'Как выжить при встрече с элементалем земли? Очень просто. Бежать со всех ног.',
          fractionId: 4,
          ability: null,
          fieldType: ['siege'],
          power: 6,
          quantity: 1,
        },
        {
          id: 15,
          name: 'Гарпия келено',
          type: 'usual',
          image: 'src/assets/images/nml_celaeno_harpy.png',
          description: 'Обычные гарпии питаются падалью. А келено - снами.',
          fractionId: 4,
          ability: 'agile',
          fieldType: ['melee', 'range'],
          power: 2,
          quantity: 1,
        },
        {
          id: 16,
          name: 'Чучело',
          type: 'special',
          image: 'src/assets/images/spc_dummy.png',
          description: 'Пусть стреляют по крестьянам. А нет крестьян - поставьте чучела.',
          fractionId: null,
          ability: 'decoy',
          fieldType: ['melee', 'range', 'siege'],
          power: null,
          quantity: 3,
        },
        {
          id: 17,
          name: 'Мороз',
          type: 'special',
          image: 'src/assets/images/spc_frost.png',
          description: 'Мечта хорошего командира... кошмар плохого.',
          fractionId: null,
          ability: 'frost',
          fieldType: ['weather'],
          power: null,
          quantity: 10,
        },
        {
          id: 18,
          name: 'Фольтест Король Темерии',
          type: 'leader',
          fieldType: [],
          power: null,
          quantity: 1,
          description: 'Родственная любовь? Что может быть прекраснее, чем сестра на коленях брата?',
          ability: null,
          fractionId: 1,
          image: 'src/assets/images/realms_foltest_silver.jpg',
        },
        {
          id: 19,
          name: 'Фольтест Предводитель Севера',
          type: 'leader',
          fieldType: [],
          power: null,
          quantity: 1,
          description: 'Проклятая политика... Я доверяю только своему оружию.',
          ability: null,
          fractionId: 1,
          image: 'src/assets/images/realms_foltest_gold.jpg',
        },
        {
          id: 20,
          name: 'Фольтест Завоеватель',
          type: 'leader',
          fieldType: [],
          power: null,
          quantity: 1,
          description: 'Точный выстрел из баллисты сокрушит не только укрпеления врага, но и его дух.',
          ability: null,
          fractionId: 1,
          image: 'src/assets/images/realms_foltest_copper.jpg',
        },
        {
          id: 21,
          name: 'Фольтест Железный Владыка',
          type: 'leader',
          fieldType: [],
          power: null,
          quantity: 1,
          description: 'Замечательный день для битвы!',
          ability: null,
          fractionId: 1,
          image: 'src/assets/images/realms_foltest_bronze.jpg',
        },
        {
          id: 22,
          name: 'Эмгыр вар Эмрейс Йож из Эрленвальда',
          type: 'leader',
          fieldType: [],
          power: null,
          quantity: 1,
          description: 'Интересно, как чувствует себя человек, прикончивший собственную жену?',
          ability: null,
          fractionId: 2,
          image: 'src/assets/images/nilfgaard_emhyr_gold.jpg',
        },
        {
          id: 23,
          name: 'Эмгыр вар Эмрейс Император Нильфграада',
          type: 'leader',
          fieldType: [],
          power: null,
          quantity: 1,
          description: 'Мотивы меня не интересуют. Только результаты.',
          ability: null,
          fractionId: 2,
          image: 'src/assets/images/nilfgaard_emhyr_bronze.jpg',
        },
        {
          id: 24,
          name: 'Францеска Финдабаир Истинная эльфка',
          type: 'leader',
          fieldType: [],
          power: null,
          quantity: 1,
          description: 'Пепел удобряет. Весной Долина Цветов расцветёт вновь.',
          ability: null,
          fractionId: 3,
          image: 'src/assets/images/scoiatael_francesca_gold.jpg',
        },
        {
          id: 25,
          name: 'Францеска Финдабаир Маргаритка из Долин',
          type: 'leader',
          fieldType: [],
          power: null,
          quantity: 1,
          description: 'Старшая Раса забыла больше, чем  люди когда-либо знали.',
          ability: null,
          fractionId: 3,
          image: 'src/assets/images/scoiatael_francesca_silver.jpg',
        },
        {
          id: 26,
          name: 'Эредин Бреакк Глас Командир Дикой Охоты',
          type: 'leader',
          fieldType: [],
          power: null,
          quantity: 1,
          description: 'Держи себя в руках Геральт. Ты же знаешь, чем это кончится.',
          ability: null,
          fractionId: 4,
          image: 'src/assets/images/monsters_eredin_silver.jpg',
        },
        {
          id: 27,
          name: 'Эредин Бреакк Глас Владыка Тир на Лиа',
          type: 'leader',
          fieldType: [],
          power: null,
          quantity: 1,
          description: 'Это неизбежно.',
          ability: null,
          fractionId: 4,
          image: 'src/assets/images/monsters_eredin_gold.jpg',
        },
      ] as Card[],
      deckCards: [] as CardAPI[],
      deckCardsNorth: [] as CardAPI[],
      deckCardsNilfgaard: [] as CardAPI[],
      deckCardsScoiatel: [] as CardAPI[],
      deckCardsMonsters: [] as CardAPI[],
    };
  },
  async beforeMount() {
    /*
    this.collectionCards = await getCards();
    const myCards: UserCard[] = await getUserCards();
    myCards.forEach((userCard) => {
      switch (userCard.fraction_id) {
        case 1:
          this.deckCardsNorth = userCard.cards;
          break;
        case 2:
          this.deckCardsNilfgaard = userCard.cards;
          break;
        case 3:
          this.deckCardsScoiatel = userCard.cards;
          break;
        case 4:
          this.deckCardsMonsters = userCard.cards;
          break;
        default:
          break;
      }
    });
    */
  },
  methods: {
    changeFilterCollection(data: Filters) {
      this.collectionFilter = data;
    },
    changeFilterDeck(data: Filters) {
      this.deckFilter = data;
    },
    changeFraction(data: number) {
      this.currentFraction = data;
      this.currentDeckCards();
    },
    currentDeckCards() {
      switch (this.currentFraction) {
        case 1:
          this.deckCards = this.deckCardsNorth;
          break;
        case 2:
          this.deckCards = this.deckCardsNilfgaard;
          break;
        case 3:
          this.deckCards = this.deckCardsScoiatel;
          break;
        case 4:
          this.deckCards = this.deckCardsMonsters;
          break;
      }
    },
    addCard(data: Card) {
      let deckCard = this.deckCards.find((item) => item.card_id === data.id);
      if (deckCard) {
        deckCard.quantity += 1;
      } else {
        this.deckCards.push({ card_id: data.id, quantity: 1 });
      }
    },
    deleteCard(data: Card) {
      let deckCard = this.deckCards.find((item) => item.card_id === data.id);
      if (deckCard) {
        if (data.quantity === 1) {
          const index = this.deckCards.indexOf(deckCard);
          this.deckCards.splice(index, 1);
        } else {
          deckCard.quantity -= 1;
        }
      }
    },
  },
  computed: {
    changeCollectionsCards() {
      return this.collectionCards
        .map((item) => {
          let deckCard = this.deckCards.find((el) => el.card_id === item.id);
          if (deckCard) {
            return {
              ...item,
              quantity: item.quantity - deckCard.quantity,
            };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    },
    fullDeckCards(): Card[] {
      let cards: Card[] = [];
      this.deckCards.forEach((cardAPI) => {
        this.collectionCards.forEach((card) => {
          if (cardAPI.card_id === card.id) {
            let newCard: Card = JSON.parse(JSON.stringify(card));
            newCard.quantity = cardAPI.quantity;
            cards.push(newCard);
          }
        });
      });
      return cards;
    },
  },
  created() {
    this.currentDeckCards();
  },
  components: {
    FractionChoose,
    CardCollection,
    InfoCollection,
  },
});
</script>

<template>
  <video autoplay muted loop class="background">
    <source src="@/assets/videos/backFog.mp4" type="video/mp4" />
  </video>
  <main class="main">
    <div class="UI">
      <div class="fraction">
        <FractionChoose
          @currentFraction="changeFraction"
          :collectionFilter="collectionFilter"
          :deckFilter="deckFilter"
        />
      </div>
      <div class="builder">
        <CardCollection
          @filterChanged="changeFilterCollection"
          @selectedCard="addCard"
          :currentFraction="currentFraction"
          :gwentCards="changeCollectionsCards"
        />
        <InfoCollection
          :currentFraction="currentFraction"
          :leadersCards="collectionCards"
          :selectedCards="fullDeckCards"
        />
        <CardCollection
          @filterChanged="changeFilterDeck"
          @selectedCard="deleteCard"
          :currentFraction="currentFraction"
          :gwentCards="fullDeckCards"
        />
      </div>
    </div>
  </main>
</template>

<style lang="scss">
$DECK_COLOR: #4d392c;

html {
  &::-webkit-scrollbar {
    display: none;
  }
  font-weight: 300;

  background-color: #171617;
}

.main {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba($color: #000000, $alpha: 0.7);
  width: 100vw;
  height: calc(100vw * 9 / 16);
}

.background {
  z-index: 0;
  width: 100vw;
  height: calc(100vw * 9 / 16);
  position: absolute;
}

.UI {
  width: 85%;
  height: 90%;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.fraction {
  display: flex;
  justify-content: space-between;
  height: 20%;

  &__choose {
    flex-grow: 1;
  }
}

.builder {
  display: flex;
  height: 90%;
}
</style>
