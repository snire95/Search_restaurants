def anagram2 (s1, s2):
    s1 = s1.replace(' ', '').lower()
    s2 = s2.replace(' ', '').lower()
    print ("s1 : " + s1)
    print ("s2 : " + s2)
    print (len(s1))
    print (len(s2))

    if len(s1) != len(s2):
        return False
    count = {}
    for letter in s1:
        print(count)
        if letter in count:
            count[letter] += 1
        else:
            count[letter] = 1
    print("----------------------")
    for letter in s2:
        print(count)
        if letter in count:
            count[letter] -= 1
        else:
            count[letter] = 1  
    for k in count:
        if count[k] !=0:
            return False
    return True

snir = anagram2('clint eastwood','old west action')
print(snir)