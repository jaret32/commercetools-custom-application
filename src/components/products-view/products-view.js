import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import DataTable from '@commercetools-uikit/data-table';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { FetchProducts } from './products.graphql';

const columns = [
  { key: 'name', label: 'Name', isSortable: true, renderItem: row => row.masterData.current.name },
  { key: 'description', label: 'Description', isTruncated: true, width: 'minmax(150px, 500px)', renderItem: row => row.masterData.current.description },
  { key: 'import', label: '', align: 'right', shouldIgnoreRowClick: true, renderItem: row => <PrimaryButton label='Import' onClick={() => console.log('button click')} />}
]; 

const projectKey = 'jboyer-pfl-store-front';
const target = GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM;

const ProductsView = (props) => {
  const history = useHistory();
  const { loading, error, data } = useQuery(FetchProducts, {
    context: { projectKey, target }
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <DataTable
      columns={columns}
      rows={data.products.results}
      onRowClick={row => history.push(`${props.match.url}/${row.id}`)} />
  );
};

ProductsView.displayName = 'ProductsView';
export default ProductsView;
