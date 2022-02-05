let container = document.querySelector('.sketch-container');

let mouseDown = false;

container.addEventListener('mousedown', () => 
{
    mouseDown = true;
});

container.addEventListener('mouseup', () => 
{
    mouseDown = false;
});

function addPaintEvent()
{
    let blocks = document.querySelectorAll('.test');
    blocks.forEach( block =>
    {
            block.addEventListener('mouseover', () =>
            {
                if(mouseDown)
                    block.style.setProperty("background-color", `${document.querySelector('.paintbrushColor-selector').value}`);
            } );

            block.addEventListener('click', () =>
            {
                    block.style.setProperty("background-color", `${document.querySelector('.paintbrushColor-selector').value}`);
            } );
    });
}

let squareSideSize = 20; 

function generateBoxes(width, height, squareSideSize)
{
    let blocks = document.querySelectorAll('.test');
    let container = document.querySelector('.sketch-container');

    for(let block of blocks)
    {
        container.removeChild(block);
    }

    container.style.setProperty("max-width", `${width}px`);

    for(let i = 0; i < (width/squareSideSize)*(height/squareSideSize); i++)
    {
        let block = document.createElement('div');
        block.classList.add('test');
        container.appendChild(block);
    }

    addPaintEvent();

}

let width = document.querySelector('#width').value;
let height = document.querySelector('#height').value;

generateBoxes(width, height, squareSideSize);


addPaintEvent();

let submitButton = document.querySelector('.resize-button');

submitButton.addEventListener('click', () =>
{
    let width = document.querySelector('#width').value;
    let height = document.querySelector('#height').value;
    generateBoxes(width, height, squareSideSize);
});




