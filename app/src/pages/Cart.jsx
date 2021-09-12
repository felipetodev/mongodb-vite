import React, { useRef } from 'react'
import { useCart } from '../context'
import {
  Text,
  DrawerHeader,
  Button,
  Drawer,
  CloseButton,
  Divider,
  DrawerBody,
  DrawerFooter,
  Stack,
  DrawerOverlay,
  DrawerContent,
  useDisclosure
} from '@chakra-ui/react'

export default function Cart () {
  const cartSliderRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { items, totalItems, totalPrice, onRemoveItem, onClearCart } = useCart()
  const { appendItemToCart: onIncrementItem, onDecrementItem } = useCart()

  return (
    <>
      <Button ref={cartSliderRef} colorScheme='teal' onClick={onOpen}>
        Cart: {totalItems}
      </Button>
      <Drawer placement='right' size='sm' isOpen={isOpen} onClose={onClose} initialFocusRef={cartSliderRef}>
        <DrawerOverlay>
          <DrawerContent paddingTop={4}>
            <DrawerHeader paddingX={4}>
              <Stack alignItems='center' direction='row' justifyContent='space-between'>
                <Stack direction='row' fontSize={{ base: '2xl', sm: '3xl' }} fontWeight='500'>
                  <Text>Your Cart</Text> <Text color='gray.400'>({totalItems})</Text>
                </Stack>
                <CloseButton onClick={onClose} />
              </Stack>
            </DrawerHeader>

            <DrawerBody paddingX={4}>
              <Stack divider={<Divider />} spacing={4}>
                {items && items.map(({ product, quantity }) => (
                  <Stack key={product.id} direction='row'>
                    <Stack width='100%'>
                      <Stack
                        alignItems='center'
                        direction='row'
                        fontWeight='500'
                        justifyContent='space-between'
                      >
                        <Text fontSize='lg'>{product.name} (x{quantity})</Text>
                        <Stack>
                          <Text>$ {product.price * quantity}</Text>
                        </Stack>
                      </Stack>
                      <Stack direction='row' justifyContent='space-between'>
                        <Stack direction='row'>
                          <Button
                            borderRadius={9999}
                            colorScheme='teal'
                            size='xs'
                            onClick={() => onDecrementItem({ product, quantity })}
                          >
                            {' '}
                            -{' '}
                          </Button>
                          <Text fontWeight='500'>
                            {quantity}
                          </Text>
                          <Button
                            borderRadius={9999}
                            colorScheme='teal'
                            size='xs'
                            onClick={() => onIncrementItem({ product, quantity })}
                          >
                            {' '}
                            +{' '}
                          </Button>
                        </Stack>
                        <Text>
                          <Button
                            borderRadius={9999}
                            colorScheme='red'
                            size='xs'
                            onClick={() => onRemoveItem({ product, quantity })}
                          >
                            x
                          </Button>
                        </Text>
                      </Stack>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </DrawerBody>

            {Boolean(items.length) && (
              <DrawerFooter paddingX={4}>
                <Stack spacing={4} width='100%'>
                  <Divider />
                  <Stack
                    alignItems='center'
                    direction='row'
                    fontSize='lg'
                    fontWeight='500'
                    justifyContent='space-between'
                  >
                    <Text>Total</Text>
                    <Text>$ {totalPrice}</Text>
                  </Stack>
                  <Button
                    onClick={onClearCart}
                    size='lg'
                    width='100%'
                    colorScheme='teal'
                  >
                    Delete All
                  </Button>
                  <Button
                    colorScheme='whatsapp'
                    size='lg'
                    width='100%'
                  >
                    Checkout
                  </Button>
                </Stack>
              </DrawerFooter>
            )}
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
