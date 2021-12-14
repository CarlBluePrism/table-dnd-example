# Table Drag and Drop example

Very simple example of the drag and drop functionality using the HTML API (https://html.spec.whatwg.org/multipage/dnd.html#dnd).

This implements the basic column dragging we want but there are a couple of areas which we would need to conisder.

1. Setting the drag image to a different element that the table header could prove difficult.
2. We'll need to consider having a listener on the whole document (behaviour when the header is dropped outside the table.
