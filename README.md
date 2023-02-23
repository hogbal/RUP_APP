# RUP-APP-VER3
 
프로젝트 클론 시 node_modeule/react-native-animated-searchbox 코드 변경


ReactNativeAnimatedSearchbox 클래스 안에 다음 코드 추가
```javascript
componentDidMount(){         
        const {searchUnivBox} = this.props         
        if(searchUnivBox===true){             
            this.open()         
        }else{             
            this.close()         
        }     
    }
```
 useNativeDriver:false 추가

![이미지](https://i.ibb.co/pb9mH3P/444.png)

render() {

    const {height, borderRadius, fontSize, backgroundColor, placeholderTextColor, shadowColor, 
    
    placeholder} = this.props;

}

위 코드를 

render() {

    const {height, borderRadius, fontSize, backgroundColor, placeholderTextColor, shadowColor, 
    
    placeholder, searchUniversity} = this.props;

}

위와 같이 변경

 
```javascript
onChangeText={(text)=>searchUniversity(text)}
```

위 코드를 다음 이미지와 같은 위치에 추가

![이미지](https://i.ibb.co/zHx9G9Z/555.png)

