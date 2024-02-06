import random

# Function to generate a random array
def generate_random_array():
    # Generate a random length between 5 and 10 inclusive
    array_length = random.randint(5, 10)
    # Generate an array of random numbers between 5 and 100
    random_array = [random.randint(5, 100) for _ in range(array_length)]
    return random_array

# Generate 20 arrays and write them into a text file
with open("../random_arrays.txt", "w") as file:
    for i in range(20):
        array = generate_random_array()
        array_str = ' '.join(map(str, array)) # Convert the array to a string
        file.write(f"{array_str}\n")