$.fn.inputCount = function () {
	return this.each(function() {
		var input = $(this).find('input[type="text"]'),
			summ = $(this).find('.basket__col--cost > span').text().replace(/\s+/g, ''),
			inSumm = $(this).find('.basket__col--cost > span'),
			sale = $(this).find('.sale-box--input').text(),
			inSale = $(this).find('.sale-box--input');

		input.on('keypress', function (e) {
			if( e.which > 57 || e.which < 48 || input.val().length >=2 ) e.preventDefault();
		});

		input.on('change', function (e) {
			var reg = /^\d+$/;
			if( !reg.test(input.val()) || input.val().length >2 || input.val().length == 0 || input.val() == 0) {
				e.preventDefault();
				input.val(1);
			}

			serialise(input.val())
		});
	

		$(this).find('.basket__count').on('click', function (e) {
			e.preventDefault();

			if ($(this).hasClass('basket__count--next')) {

				if (+input.val() < 99) input.val(+input.val() + 1)

				serialise(input.val())

			} else if (+input.val() > 1) {
				input.val(+input.val() - 1);

				serialise(input.val())
			}
		})

		function serialise (val) {
			var totalSumm = val * summ,
				totalSale = val * sale;

			totalSumm = totalSumm.toString();
			totalSale = totalSale.toString();

			//отделяем тысячи от сотен
			inSumm.text(totalSumm.substr(0, totalSumm.length - 3) + ' ' + totalSumm.substr(-3,3));
			inSale.text(totalSale.substr(0, totalSale.length - 3) + ' ' + totalSale.substr(-3,3))
		}
	});
};


$.fn.closeGoods = function () {
	return this.each(function() {
		var self = this;

		$(this).find('.basket__prod--close').on('click', function (e) {
			e.preventDefault();	

			$(self)
				.fadeTo(400, 0)
				.delay(200)
				.slideUp(400)
				.after('<p class="basket__delete">Товар удален <a href="#">восстановить</a></p>')
				.next()
				.delay(700)
				.show(300)
				.delay(40000)
				.fadeOut(6000)
				.find('a')
				.on('click', function (e) {
					e.preventDefault();

					$(self)
						.next()
						.clearQueue()
						.hide(300)
						.prev()
						.slideDown(400)
						.delay(200)
						.fadeTo(400, 1);
				});
		});
	})
};


// var Validator = {
//     init: function (options, elem) {

//         var self = this;

//         self.elem = elem;
//         self.options = $.extend({}, $.fn.validator.options, options);
//     }
// }

// $.fn.validator = function (options) {
//     return this.each(function() {

//         var valid = Object.create( Validator );
//         valid.init( options, this );
//     });

// };

// $.fn.validator.options = {
//     //здесь будут опции
// };