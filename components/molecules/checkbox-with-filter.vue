<template>
  <fieldset class="form-item checkbox-filter">
    <legend>{{ legend }}</legend>

    <div class="form-columns">
      <div>
        <div :id="id"
             :class="`modal modal--fixed-height checkbox-filter__modal${modalOpen ? ' visible' : ''}`"
             :data-scrollable="'#' + id + '_scrollable'"
             tabindex="-1">
          <div class="modal-inner">
            <div class="modal-header">
              <button :data-target="id"
                      type="button"
                      class="button icon-cross modal-close checkbox-filter__close"
                      @click="close">
                <span>Sluiten</span><i class="icon-close" aria-hidden="true" />
              </button>
            </div>
            <div :id="id + '_scrollable'" class="modal-content" tabindex="0">
              <h3>{{ legend }}</h3>
              <div class="checkbox-filter__selected">
                <span v-for="(item, index) in selectedItems" :key="`selected-${index}`"
                      :data-value="item"
                      class="tag filter">
                  {{ item }}
                  <button type="button" @click="removeTag(item)">
                    <span class="visually-hidden">Verwijder tag</span>
                  </button>
                </span>
              </div>
              <div class="form-item">
                <label :for="`checkboxes__filter_id_${legend}`">Filter onderstaande lijst</label>
                <div class="form-item checkbox-filter__filter__search-wrapper">
                  <input :id="`checkboxes__filter_id_${legend}`" type="search"
                         class="checkbox-filter__filter">
                  <p class="checkbox-filter__result-wrapper" aria-live="polite" aria-atomic="true">
                    We vonden <span class="checkbox-filter__result">#</span> resultaten.
                  </p>
                </div>
              </div>
              <div class="checkbox-filter__checkboxes">
                <div v-for="(item, index) in items" :key="`${name}-chk-${index}`" class="checkbox">
                  <input :id="`${name}-chk-${index}`" v-model="selectedItems"
                         :value="item"
                         :name="name" type="checkbox"
                         @change.prevent="updateValue">
                  <label :for="`${name}-chk-${index}`">{{ item }}</label>
                </div>
              </div>
            </div>
            <div class="modal-actions">
              <button :data-target="id"
                      type="button"
                      class="button button-primary button-small checkbox-filter__submit modal-close"
                      @click="updateCount">
                Bevestig selectie
              </button>
            </div>
          </div>

          <div :data-target="id"
               class="modal-overlay modal-close"
               @click="close" />
        </div>

        <p v-if="selectedCount > 0" class="checkbox-filter__count-wrapper">
          <strong>
            <span class="checkbox-filter__count" />
            {{ `${selectedCount} ${selectedLegend} geselecteerd` }}
          </strong>
        </p>

        <button :data-hash="hash"
                :aria-controls="id"
                type="button"
                class="button button-secondary button-small checkbox-filter__open"
                aria-expanded="false"
                @click="open">
          Selecteer ...
        </button>
      </div>
    </div>
  </fieldset>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    legend: {
      type: String,
      required: true
    },
    selectedLegend: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      selectedItems: this.value,
      tempItems: [],
      selectedCount: 0,
      modalOpen: false,
      hash: `#${this.id}`
    }
  },
  mounted () {
    this.updateCount()
  },
  methods: {
    /**
     * Emit the selected items.
     */
    updateValue () {
      this.$emit('input', this.selectedItems)
    },
    /**
     * Remove an item from selectedItems.
     * @param {String} tag
     */
    removeTag (tag) {
      const index = this.selectedItems.indexOf(tag)
      if (index > -1) {
        this.selectedItems.splice(index, 1)
      }
    },
    /**
     * Close the modal and restore selectedItems.
     */
    close () {
      this.selectedItems = this.tempItems
      this.updateCount()
      this.updateValue()
      this.modalOpen = false
    },
    /**
     * Open the modal and save selectedItems.
     */
    open () {
      this.modalOpen = true
      // make a shallow copy
      this.tempItems = this.selectedItems.slice()
    },
    /**
     * Updated the selected items count.
     */
    updateCount () {
      this.modalOpen = false
      this.selectedCount = this.selectedItems.length
      this.modalOpen = false
    }
  }
}
</script>

<style>
/*
Hide the styleguide required countspan,
replaced by our own.
*/
.checkbox-filter__count {
  display: none;
}
</style>
