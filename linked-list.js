/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = Node(val);
    if(!this.head){
      this.head = newNode;
      this.tail = newNode;
      this.length += 1;
      return undefined;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    this.length += 1;
    return undefined;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = Node(val);
    if(!this.head){
      this.head = newNode;
      this.length += 1;
      return undefined;
    }
    newNode.next = this.head;
    this.head = newNode;
    this.length += 1;
    return undefined;
  }

  /** pop(): return & remove last item. */

  pop() {
    // If the list is empty, then it will throw an error
    if(!this.tail){
      throw "The linked list does not contain any values"
    }
    let currentNode = this.head;
    while(currentNode){
      // If the next value of the current node is the tail, it will assign the current node as the tail, the next value as null
      // and it will return the value that was removed (otherwise, the current node will move to the next node)
      if (currentNode.next = this.tail){
        let removedItem = this.tail;
        this.tail = currentNode;
        currentNode.next = null;
        this.length -= 1;
        return removedItem;
      }
      currentNode = currentNode.next;
    }
    // If there is only one value in the list, then it will return the removed item and set the head and tail to null
    let removedItem = this.tail;
    this.tail = null;
    this.head = null;
    this.length -= 1;
    return removedItem;
  }

  /** shift(): return & remove first item. */

  shift() {
    // If the list is empty, then it will throw an error
    if(!this.head){
      throw "The linked list does not contain any values"
    }
    // If there is more than one value in the list, then the head will be removed/returned and set to the next value
    if(this.head.next){
      let removedItem = this.head;
      this.head = this.head.next;
      this.length -= 1;
      return removedItem;
    }
    let removedItem = this.head;
    this.head = null;
    this.length -= 1;
    return removedItem;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if(!this.head){
      throw "The linked list does not contain any values"
    }
    let currentNode = this.head;
    let calcIndex = 0;
    while(currentNode){
      if(calcIndex == idx){
        return currentNode.val
      }
      calcIndex += 1;
      currentNode = currentNode.next;
    }
    throw `${idx} is not a valid index in this list`
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if(!this.head){
      throw "The linked list does not contain any values"
    }
    let maxLength = this.length;
    // If the max length exceeds the given index (plus 1) or the index is less than 0, an error will be thrown
    if(maxLength < idx + 1 || idx < 0){
      throw `${idx} is not a valid index in this list`;
    }
    // If there is only one value, then the head (and tail) will be set to val
    if(!this.head.next){
      this.head.val = val;
      this.tail.val = val;
      return this.head.val;
    }
    // If there are multiple values, then once it reaches the index just before the requested index, it will change the next value to a different node and set the next value for that node to the corresponding next value
    let calcIndex = 0;
    let currentNode = this.head;
    let previousNode = null;
    while(currentNode){
      if(calcIndex == idx && !previousNode){
        this.head.val = val;
        return this.head.val;
      }
      else if(calcIndex == idx && previousNode){
        previousNode.next = val;
        currentNode.val = val;
        return currentNode.val;
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
      calcIndex += 1;
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if(!this.head){
      throw "The linked list does not contain any values"
    }
    let maxLength = this.length;
    // If the max length exceeds the given index (plus 1) or the index is less than 0, an error will be thrown
    if(maxLength < idx + 1 || idx < 0){
      throw `${idx} is not a valid index in this list`
    }
    // If there is only one value, then a new node will be created (with the next value being the head) and the head will be set to the new node
    if(!this.head.next){
      let newNode = Node(val, this.head.val);
      this.tail = this.head;
      this.head = newNode;
      this.length += 1;
      return newNode.val;
    }
    // If there is more than one value, then a new node will be created (the next value will equal the prior value's next node) and the prior node's next value will be set to the new node
    let currentNode = this.head;
    let calcIndex = 0;
    while(currentNode){
      // If the index is 0, a new Node will be created and the head will be changed
      if(calcIndex == idx && !previousNode){
        let newNode = Node(val, this.head.val);
        this.head = newNode;
        this.length += 1;
        return newNode.val;
      }
      // If the index is not 0, a new Node will be created with the next value being equal to the value of the current node's next value and the next value of the current node will be set to the new node's value
      else if(calcIndex == idx && previousNode){
        let newNode = Node(val, currentNode.next);
        currentNode.next = newNode.val;
        this.length += 1;
        return newNode.val;
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
      calcIndex += 1;
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if(!this.head){
      throw "The linked list does not contain any values"
    }
    let maxLength = this.length;
    // If the max length exceeds the given index (plus 1) or the index is less than 0, an error will be thrown
    if(maxLength < idx + 1 || idx < 0){
      throw `${idx} is not a valid index in this list`
    }
    let currentNode = this.head;
    let calcIndex = 0;
    while(currentNode){
      // If the index is 0
      if(calcIndex == idx && !previousNode){
        // If there is only 1 value
        if(maxLength == 1){
          let removedNode = currentNode.val;
          currentNode.val = null;
          this.head = null;
          this.tail = null;
          this.length -= 1;
          return removedNode;
        }
        // If there is more than 1 value
        else {
          let removedNode = currentNode.val;
          this.head = currentNode.next;
          currentNode.val = null;
          currentNode.next = null;
          this.length -= 1;
          return removedNode;
        }
      }
      // If the index is more than 0 
      else if(calcIndex == idx && previousNode){
        // If the next value of current node is not null
        if(currentNode.next != null){
          let removedNode = currentNode.val;
          previousNode.next = currentNode.next;
          currentNode.val = null;
          currentNode.next = null;
          this.length -= 1;
          return removedNode;
        }
        // If the next value of current node is null (the tail)
        else{
          let removedNode = currentNode.val;
          previousNode.next = null;
          this.tail = previousNode;
          currentNode.val = null;
          currentNode.next = null;
          this.length -= 1;
          return removedNode;
        }
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
      calcIndex += 1;
    } 
  }

  /** average(): return an average of all values in the list */

  average() {
    if(!this.head){
      throw "The linked list does not contain any values"
    }
    let currentNode = this.head;
    let fullLength = this.length;
    let total = 0;
    if(fullLength == 0){
      return 0;
    }
    while(currentNode){
      total += currentNode.val;
      if(!currentNode.next){
        return (total/fullLength)
      }
      currentNode = currentNode.next;
    }
  }
}

module.exports = LinkedList;
