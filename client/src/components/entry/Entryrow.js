import React, { Component } from 'react';
import Translation from '../locale/translate';

class EntryRow extends Component {



  render() {
	  console.log(this.props.items)
	  const { item } = this.props
	  return (
	  <tr key={item.objid}> 
		<td> {item.value} </td>
	  </tr>
	  );
	}
  
  
}

export default EntryRow;

  