import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService} from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const createMovie = () => {
    service.create({
      title: 'Test Movie',
      genres: ['test'],
      year: 2000
    });
  };

  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      createMovie();

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });

    it('should throw a NotFoundException', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      createMovie();

      const beforeDeleteCount = service.getAll().length;
      service.deleteOne(1);

      const afterDeleteCount = service.getAll().length;
      expect(afterDeleteCount).toBeLessThan(beforeDeleteCount);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {

      const beforeCreateCount = service.getAll().length;

      createMovie();

      const afterCreateCount = service.getAll().length;

      expect(afterCreateCount).toBeGreaterThan(beforeCreateCount);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      createMovie();

      service.update(1, { title: 'Updated Test'});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
