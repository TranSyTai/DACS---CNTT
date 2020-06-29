import React, { Component } from 'react';
import { Text } from 'react-native';
import { sanpham, loaisanpham } from './dataArrays';

export function getNumberOfProducts(typeCode) {
  let count = 0;
  sanpham.map(data => {
    if (data.typeCode == typeCode) {
      count++;
    }
  });
  return count;
}

export function getProducts(typeCode) {
    const productsArray = [];
    sanpham.map(data => {
      if (data.typeCode == typeCode) {
        productsArray.push(data);
      }
    });
    return productsArray;
}

export function getTypeName(typeCode) {
    let name;
    loaisanpham.map(data => {
      if (data.typeCode == typeCode) {
        name = data.name;
      }
    });
    return name;
}  

export function getProductsByTypeCode(typeCode) {
    const idUpper = typeCode.toUpperCase();
    const productsArray = [];
    loaisanpham.map(data => {
      if (data.typeCode.toUpperCase().includes(idUpper)) {
        const sanpham = getProducts(data.typeCode);
        sanpham.map(item => {
          productsArray.push(item);
        });
      }
    });
    return productesArray;
}  

export function getAllProducts(idArray) {
    const productsArray = [];
    idArray.map(index => {
      sanpham.map(data => {
        if (data.typeCode == index[0]) {
            productsArray.push([data, index[1]]);
        }
      });
    });
    return productsArray;
}

export function getProductsByTypeName(typeName) {
  const nameUpper = typeName.toUpperCase();
  const productsArray = [];
  loaisanpham.map(data => {
    if (data.typeName.toUpperCase().includes(nameUpper)) {
      const sanpham = getProducts(data.typeCode); // return a vector of recipes
      sanpham.map(item => {
        productsArray.push(item);
      });
    }
  });
  return productsArray;
}

export function getProductsByName(productName) {
  const nameUpper = productName.toUpperCase();
  const productsArray = [];
  sanpham.map(data => {
    if (data.name.toUpperCase().includes(nameUpper)) {
      productsArray.push(data);
    }
  });
  return productsArray;
}
