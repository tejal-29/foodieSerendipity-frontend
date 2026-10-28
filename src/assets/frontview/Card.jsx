document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.large-benefit-card');

  cards.forEach(clickedCard => {
    clickedCard.addEventListener('click', () => {
      const isAlreadyOpen = clickedCard.classList.contains('open');

      cards.forEach(card => {
        card.classList.remove('open');
      });

      if (!isAlreadyOpen) {
        clickedCard.classList.add('open');
      }
    });
  });
});