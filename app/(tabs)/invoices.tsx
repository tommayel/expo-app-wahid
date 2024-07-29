import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, FlatList } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { Invoice } from '@/components/invoices/types';

export default function TabTwoScreen() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch('http://crebon.co.uk/api/invoices');
      const data = await response.json();
      setInvoices(data);
    } catch (e) {
      console.error('Error fetching invoices, e=' + e);
      setError('Error fetching invoices, e=' + e);
    }
  };

  return (
    <View style={styles.container}>
      {!!error && <ThemedText style={styles.error}>{error}</ThemedText>}
      {!error && (
        <FlatList
          data={invoices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.invoiceContainer}>
              <ThemedText style={styles.invoiceText}>
                Invoice ID: {item.id}
              </ThemedText>
              <ThemedText style={styles.invoiceText}>
                Amount: {item.amount}
              </ThemedText>
              <ThemedText style={styles.invoiceText}>
                Date: {item.date}
              </ThemedText>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  invoiceContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  invoiceText: {
    fontSize: 16,
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
});
