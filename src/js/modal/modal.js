$(() => {
  class Modal {
    constructor() {
      this.modalOverlay = $('#prg-modalOverlay');
      this.teacherSearchModal = $('#prg-teacherStationModal');
      this.subscribe();
      this.bindEvent();
    }
    subscribe() {
      pubsub.subscribe('pubsub.page.teacherSearch.station.clicked', $.proxy(this.onClickedTeacherStationSearch, this))
      pubsub.subscribe('pubsub.page.teacherSearch.stationBtn.clicked', $.proxy(this.closeModal, this))
    }
    bindEvent() {
      this.modalOverlay.on('click', $.proxy(this.closeModal, this));
    }
    onClickedTeacherStationSearch() {
      this.modalOverlay.removeClass('isHide');
      this.teacherSearchModal.removeClass('isHide');
    }
    closeModal() {
      this.teacherSearchModal.addClass('isHide');
      this.modalOverlay.addClass('isHide');
    }
  }
  new Modal();
})