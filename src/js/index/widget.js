$(() => {
    const Index = {
        build() {
            this.bindEvent();
        },
        bindEvent() {
            $('#prg-onlineTeachingTab').on('click', this.switchOnline);
            $('#prg-offlineTeachingTab').on('click', this.switchOffline);
        },
        switchOnline() {
            $('#prg-onlineTeachingTab').addClass('isActive');
            $('#prg-offlineTeachingTab').removeClass('isActive');
            $('#prg-onlineTeachingSearch').removeClass('isHide');
            $('#prg-offlineTeachingSearch').addClass('isHide');
        },
        switchOffline() {
            $('#prg-offlineTeachingTab').addClass('isActive');
            $('#prg-onlineTeachingTab').removeClass('isActive');
            $('#prg-offlineTeachingSearch').removeClass('isHide');
            $('#prg-onlineTeachingSearch').addClass('isHide');
        },
    }
    Index.build();
})