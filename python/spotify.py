import csv
import json
def open_csv(filename):
    with open(filename, 'r') as f:
        reader = csv.reader(f)
        next(reader)
        return list(reader)
    
def top_10_songs():
    data = open_csv('spotify-2023.csv')
    data.sort(key=lambda x: int(x[6]), reverse=True)
    
    result = []
    for song in data[:10]:
        track_name = song[0]
        artist_name = song[1]
        in_spotify_playlist = int(song[6])
        
        song_dict = {
            "track_name": track_name,
            "artist_name": artist_name,
            "in_spotify_playlist": in_spotify_playlist
        }
        result.append(song_dict)
    
    print(json.dumps(result, indent=4))

if __name__ == "__main__":
    top_10_songs()

