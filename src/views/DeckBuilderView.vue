<script lang="ts">
import { defineComponent } from 'vue';
import FractionChoose, { type Filters } from '@/components/deck-builder-view/FractionChoose.vue';
import CardCollection from '@/components/deck-builder-view/CardsCollection.vue';
import InfoCollection from '@/components/deck-builder-view/InfoCollection.vue';
import type Card from '@/interfaces/card';
import type { CardAPI, CardFromAPI, CardQuantity, UserCard, AllCardsFromAPI } from '@/interfaces/cardAPI';
import { getCards, getUserCards } from '@/api/deckAPI';

const token = '7b605cfdafb649794fe9d95f5e1827f490e7ac50';

export default defineComponent({
  data() {
    return {
      collectionFilter: 'all' as Filters,
      deckFilter: 'all' as Filters,
      currentFraction: 1,
      collectionCards: [] as Card[],
      deckCards: [] as CardAPI[],
      deckCardsNorth: [] as CardAPI[],
      deckCardsNilfgaard: [] as CardAPI[],
      deckCardsScoiatel: [] as CardAPI[],
      deckCardsMonsters: [] as CardAPI[],
    };
  },
  async beforeMount() {
    const deckAPI: AllCardsFromAPI[] = await getCards(token);
    this.collectionCards = this.getNormalCards(deckAPI);
    const myCards: CardFromAPI[] = await getUserCards(token);
    myCards.forEach((userCard) => {
      switch (userCard.fraction.id) {
        case 1:
          this.deckCardsNorth = this.getNormalDeck(userCard.cards);
          this.deckCards = this.deckCardsNorth;
          break;
        case 2:
          this.deckCardsNilfgaard = this.getNormalDeck(userCard.cards);
          break;
        case 3:
          this.deckCardsScoiatel = this.getNormalDeck(userCard.cards);
          break;
        case 4:
          this.deckCardsMonsters = this.getNormalDeck(userCard.cards);
          break;
        default:
          break;
      }
    });
  },
  methods: {
    getNormalDeck(deckAPI: CardQuantity[]): CardAPI[] {
      let deck: CardAPI[] = [];
      deckAPI.forEach((card) => {
        deck.push({
          card_id: card.card.id,
          quantity: card.quantity,
        });
      });
      return deck;
    },
    getNormalCards(deckAPI: AllCardsFromAPI[]): Card[] {
      let deck: Card[] = [];
      deckAPI.forEach((card: AllCardsFromAPI) => {
        deck.push({
          id: card.id,
          name: card.name,
          type: card.type,
          image: card.image,
          description: card.description,
          fractionId: card.fraction,
          ability: card.card_ability,
          fieldType: card.field_type,
          power: card.power,
          quantity: card.quantity,
        });
      });
      return deck;
    },
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
    deckCardsForAPI(): UserCard[] {
      const deckArr = [this.deckCardsNorth, this.deckCardsNilfgaard, this.deckCardsScoiatel, this.deckCardsMonsters];
      const userCards: UserCard[] = [];
      deckArr.forEach((deck, index) => {
        userCards.push({ fraction_id: index + 1, cards: deck });
      });
      return userCards;
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
          :cardsForAPI="deckCardsForAPI"
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
