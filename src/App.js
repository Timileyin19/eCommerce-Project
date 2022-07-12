import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import CollectionOverview from "./components/collections-overview/collections-overview.component";
import CollectionPage from "./pages/collection/collection.component";
import NotFound from "./components/not-found/not-found.component";
import "./App.css";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

// graphql
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        products: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        productCategories: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

function App({ setCurrentUser }) {
  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef?.onSnapshot((snapShot) => {
          setCurrentUser({ id: snapShot.id, ...snapShot.data() });
        });
      }

      setCurrentUser(userAuth);
    });
  }, [setCurrentUser]);

  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<CollectionOverview />} />
          <Route path="/shop/:collectionId" element={<CollectionPage />} />
          <Route path="/signin" element={<SignInAndSignUpPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ApolloProvider>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
