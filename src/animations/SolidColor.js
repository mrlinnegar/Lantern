const SolidColor  = (function() {

  function render(color = 'FFFFFF') {
    return `COLOR|${color}`;
  }

  return {
    name: 'Solid',
    render: render
  }
})();

export default SolidColor;
