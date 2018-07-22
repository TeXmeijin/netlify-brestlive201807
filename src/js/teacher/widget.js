$(() => {
  const Teacher = {
    build() {
      this.bindEvent();
      this.isOpen = false;
    },
    bindEvent() {
      $('#prg-stationChoice').on('click', this.onClickedStationChoice);
      $('#prg-switchVisibleCondition').on('click', this.switchVisibleCondition);
      $('.prg-stationButton').on('click', $.proxy(this.onClickedStationBtn, this));
    },
    onClickedStationChoice() {
      pubsub.publish('pubsub.page.teacherSearch.station.clicked');
    },
    switchVisibleCondition() {
      if (this.isOpen) {
        $('#prg-closeSearchCondition').removeClass('isHide');
        $('#prg-openSearchCondition').addClass('isHide');
        $('#prg-teacherSearchConditionInput').addClass('isHide');
      } else {
        $('#prg-closeSearchCondition').addClass('isHide');
        $('#prg-openSearchCondition').removeClass('isHide');
        $('#prg-teacherSearchConditionInput').removeClass('isHide');
      }
      this.isOpen = !this.isOpen;
    },
    onClickedStationBtn(target) {
      pubsub.publish('pubsub.page.teacherSearch.stationBtn.clicked')
      this.setStationName(target);
    },
    setStationName(evt) {
      const $target = $(evt.currentTarget);
      const data = $target.data('stationName');
      $('#prg-stationName').html(data + '駅');
    }
  }
  Teacher.build();
})