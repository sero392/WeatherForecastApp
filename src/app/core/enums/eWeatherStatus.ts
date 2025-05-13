export enum eWeatherStatus{
Sunny           = 0,    
SomeClouds      = 1,    
PartlyCloudy    = 2,    
Overcast        = 3,    
}

export const WeatherDescriptions = {
  [eWeatherStatus.PartlyCloudy]: 'Parçalı Bulutlu ☁️',
  [eWeatherStatus.SomeClouds]: 'Az Bulutlu ☁️',
  [eWeatherStatus.Sunny]: 'Güneşli ☀️',
  [eWeatherStatus.Overcast]: 'Kapalı ☁️☁️',

};