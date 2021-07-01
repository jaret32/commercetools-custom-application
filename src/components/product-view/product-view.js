import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { FetchProduct } from './product.graphql';

const projectKey = 'jboyer-pfl-store-front';
const target = GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM;

const ProductView = (props) => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(FetchProduct, {
    context: { projectKey, target },
    variables: { id }
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return JSON.stringify(data.product);
};

ProductView.displayName = 'ProductView';

export default ProductView;