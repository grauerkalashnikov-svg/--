(function () {
  var WALLETS = [
    { name: 'Bitcoin', ticker: 'BTC', address: 'bc1q4ln76pmhtnahg0w95wvwantmug7yy389scymyy' },
    { name: 'Arbitrum', ticker: 'ETH', address: '0x97727eC17ab12E2e7423a2523f2d3185d297b78E' },
    { name: 'Ethereum', ticker: 'ETH', address: '0x97727eC17ab12E2e7423a2523f2d3185d297b78E' },
    { name: 'Solana', ticker: 'SOL', address: 'Fy8Js7usbEL78bpGVRcUtoAA6tsC83mbHFfhuGYXSJs6' },
    { name: 'Tron', ticker: 'TRX', address: 'TKqE5ht8xMD1hZNMWCP6X1B6EDZwERTzov' },
  ];

  function buildModal() {
    var modal = document.createElement('div');
    modal.id = 'rvc-crypto-modal';
    modal.className = 'rvc-crypto-modal';
    modal.innerHTML =
      '<div class="rvc-crypto-modal__backdrop" data-rvc-crypto-close></div>' +
      '<div class="rvc-crypto-modal__panel" role="dialog" aria-modal="true" aria-labelledby="rvc-crypto-title">' +
      '<button type="button" class="rvc-crypto-modal__close" data-rvc-crypto-close aria-label="Закрыть">&times;</button>' +
      '<h2 id="rvc-crypto-title" class="rvc-crypto-modal__title">Поддержать Корпус</h2>' +
      '<p class="rvc-crypto-modal__hint">Выберите сеть и скопируйте адрес кошелька</p>' +
      '<ul class="rvc-crypto-modal__list">' +
      WALLETS.map(function (wallet) {
        return (
          '<li class="rvc-crypto-wallet">' +
          '<div class="rvc-crypto-wallet__head">' +
          '<span class="rvc-crypto-wallet__name">' + wallet.name + '</span>' +
          '<span class="rvc-crypto-wallet__ticker">' + wallet.ticker + '</span>' +
          '</div>' +
          '<div class="rvc-crypto-wallet__row">' +
          '<code class="rvc-crypto-wallet__addr">' + wallet.address + '</code>' +
          '<button type="button" class="rvc-crypto-wallet__copy" data-copy="' + wallet.address + '">Копировать</button>' +
          '</div>' +
          '</li>'
        );
      }).join('') +
      '</ul></div>';
    document.body.appendChild(modal);
    return modal;
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var input = document.createElement('textarea');
      input.value = text;
      input.setAttribute('readonly', '');
      input.style.position = 'absolute';
      input.style.left = '-9999px';
      document.body.appendChild(input);
      input.select();
      try {
        document.execCommand('copy');
        resolve();
      } catch (e) {
        reject(e);
      } finally {
        document.body.removeChild(input);
      }
    });
  }

  function openModal(modal) {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function init() {
    var modal = document.getElementById('rvc-crypto-modal') || buildModal();

    document.querySelectorAll('.rvc-crypto-open').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(modal);
      });
    });

    modal.addEventListener('click', function (e) {
      if (e.target.closest('[data-rvc-crypto-close]')) {
        closeModal(modal);
      }
    });

    modal.addEventListener('click', function (e) {
      var copyBtn = e.target.closest('[data-copy]');
      if (!copyBtn) return;
      var value = copyBtn.getAttribute('data-copy') || '';
      copyText(value)
        .then(function () {
          copyBtn.classList.add('is-copied');
          copyBtn.textContent = 'Скопировано';
          setTimeout(function () {
            copyBtn.classList.remove('is-copied');
            copyBtn.textContent = 'Копировать';
          }, 1600);
        })
        .catch(function () {});
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal(modal);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
